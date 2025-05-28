import axios from "axios"
import ChatRoomClient from "./ChatRoomClient"

async function getChats(roomId:string){
     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0ODQ0Mzg0Mn0.dr3LD_C7ueq5P136ReZd7UClcHkvmtw4NwbupuYFDdU"
    const response=await axios.get(`http://localhost:8001/room/chats/${roomId}`,{
         headers: {
        Authorization: `Bearer${token}`,
      },
    })
    return response.data.message
}

export default async function ChatRoom({id}:{
id:string
}){
    const message=await getChats(id)
return (    
    <div>
        <ChatRoomClient messages={message} id={id}/>    
    </div>
)
}