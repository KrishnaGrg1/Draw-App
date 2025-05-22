import WebSocket, { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  userId: string;
  ws: WebSocket;
  rooms: string[];
}
const users: User[] = [];

function checkUser(token: string): string | null {
  try{

    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (typeof decode === "string") {
      return null;
    }
    
    if (!decode || !decode.userId) {
      return null;
    }
    return decode.userId;
  }catch(e){
    return null
  }
  return null
}

wss.on("connection", (ws, request) => {
  try {
    const url = request.url;
    if (!url) {
      ws.close(1008, "Missing URL");
      return;
    }

    // Extract token from query string
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");
    if (!token) {
      ws.close(1008, "Missing token");
      return;
    }

    const userId = checkUser(token);

    if (!userId) {
      ws.close();
      return null;
    }
    users.push({
      userId,
      rooms: [],
      ws: ws
    });

    console.log(`User connected: ${userId}`);

    ws.on("message", (data) => {
      const parsedData = JSON.parse(data as unknown as string);

      if (parsedData.type === "join_room") {
        const user = users.find((x) => x.ws === ws);
        user?.rooms.push(parsedData.roomId);
      }

      if (parsedData.type === "leave_room") {
        const user = users.find((x) => x.ws === ws);
        if (!user) {
          return;
        }
        user.rooms = user?.rooms.filter((x) => x === parsedData.room);
      }

      if(parsedData.type==='chat'){
        const user=users.find(x=>x.ws===ws)
        if(user){
          return
        }
        const roomId=parsedData.roomId;
        const message=parsedData.message;
 
       users.forEach(user=> {
        if(user.rooms.includes(roomId)){
          user.ws.send(JSON.stringify({
            type:"chat",
            message,
            roomId,
            from:user.userId
          }))
        }
       }); 
      }
    });
  } catch (err) {
    console.error("WebSocket auth error:", err);
    ws.close(1008, "Authentication failed");
  }
});
