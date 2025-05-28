"use client";

import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/UseSocket";

type ChatMessage = {
  message: string;
  userId: number;
};

export default function ChatRoomClient({
  messages,
  id,
}: {
  messages: ChatMessage[];
  id: string;
}) {
  const [chats, setChats] = useState(
    messages.map((msg) => ({ ...msg, userId: Number(msg.userId) }))
  );
  const [currentMessage, setCurrentMessage] = useState("");
  const [myUserId, setMyUserId] = useState<number | null>(null);
  const myUserIdRef = useRef<number | null>(null);
  const { socket, loading } = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        })
      );

      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        if (parsedData.type === "init") {
          const userId = Number(parsedData.userId);
          setMyUserId(userId);
          myUserIdRef.current = userId;
        }

        if (parsedData.type === "chat") {
          setChats((prev) => [
            ...prev,
            {
              message: parsedData.message,
              userId: Number(parsedData.userId),
            },
          ]);
           setMyUserId(Number(parsedData.userId),);
        }
      };
    }
  }, [socket, loading, id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  // if (myUserId === null) {
  //  console.log(myUserId)
  //   return <div className="p-4 text-center">Loading chat...</div>;
  // }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border rounded-lg shadow-lg bg-white overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {chats.map((chat, index) => {
         const isMe = chat.userId === myUserId;
         
          return (
            <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 max-w-xs rounded-lg shadow-sm ${isMe
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-300 text-black rounded-bl-none"
                  }`}
              >
                <div className="text-xs font-semibold mb-1">
                  {isMe ? "You" : `User ${chat.userId}`}
                </div>
                <div>{chat.message}</div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-white flex items-center gap-2">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="Type a message..."
        />
        <button
          onClick={() => {
            if (!currentMessage.trim()) return;

            socket?.send(
              JSON.stringify({
                type: "chat",
                roomId: id,
                message: currentMessage,
              })
            );

            setCurrentMessage("");
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}
