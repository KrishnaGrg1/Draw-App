import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

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
    

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decoded || !decoded.userId) {
      ws.close(1008, "Invalid token");
      return;
    }

    // At this point, user is authenticated
    const userId = decoded.userId;

    console.log(`User connected: ${userId}`);

    ws.on("message", (data) => {
      // Echo or handle message
      ws.send("pong");
    });

  } catch (err) {
    console.error("WebSocket auth error:", err);
    ws.close(1008, "Authentication failed");
  }
});
