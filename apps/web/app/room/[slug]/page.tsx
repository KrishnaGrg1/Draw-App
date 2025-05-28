// No "use client" — this is a server component
import axios from "axios";
import ChatRoom from "../../../components/ChatRoom";

async function getRoomId(slug: string): Promise<string | null> {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0ODQ0Mzg0Mn0.dr3LD_C7ueq5P136ReZd7UClcHkvmtw4NwbupuYFDdU"
    const response = await axios.get(`http://localhost:8001/room/${slug}`, {
      headers: {
        Authorization: `Bearer${token}`,
      },
    });
    return response.data.room.id;
  } catch (e: any) {
   if(e instanceof Error){
    console.log(e.message)
    return null
   } else{
    console.log(e)
    return null
   }
  }
}

export default async function ChatRoomPage({
  params,
}: {
  params: { slug: string };
}) {
  const roomId = await getRoomId(params.slug);

  if (!roomId) {
    return <div className="text-black">Room not found or error fetching room.</div>;
  }

  return (
    <div>
      <ChatRoom id={roomId} />
    </div>
  );
}
