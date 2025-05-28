"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleJoin = () => {
    if (roomId.trim()) {
      router.push(`/room/${roomId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black px-4">
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter Room ID"
        className="mb-4 px-4  py-2 rounded placeholder:text-amber-50 text-amber-50"

      />
      <button
        onClick={handleJoin}
        className="bg-amber-50 text-black px-6 py-2 rounded hover:bg-amber-200 transition"
      >
        Join Room
      </button>
    </div>
  );
}
