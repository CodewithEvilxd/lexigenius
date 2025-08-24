"use client";

import Chat from "@/components/Chat";

export default function ChatbotPage() {
  return (
    <div className="w-[100vw] ml-[4.2em] pr-2  md:w-[70vw] rounded-xl  md:ml-0 md:mr-0  md:px-3 py-5 mt-2 ">
      <h2 className="text-2xl font-bold mb-4 text-orange-600 text-center">
        AI Chatbot
      </h2>
      <Chat />
    </div>
  );
}
