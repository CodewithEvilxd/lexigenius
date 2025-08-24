"use client";

import { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  isUser: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = { text: inputText, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputText, messages }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from the chatbot');
      }

      const data = await response.json();
      const botMessage: Message = { text: data.response, isUser: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        text: 'Sorry, something went wrong. Please try again.',
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleDownload = () => {
    if (messages.length === 0) {
      return;
    }

    const chatHistory = messages.map(msg => 
      (msg.isUser ? 'User: ' : 'Bot: ') + msg.text
    ).join('\r\n');

    const blob = new Blob([chatHistory], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'chat-history.txt';
    
    document.body.appendChild(a);
    a.click();
    
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col h-[70vh] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? 'justify-end' : 'justify-start'
            } mb-2`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                message.isUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 dark:bg-gray-600 text-black dark:text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-2">
            <div className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 text-black dark:text-white">
              Typing...
            </div>
          </div>
        )}
      </div>
      <div className="flex">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-grow border border-gray-300 dark:border-gray-600 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600"
        >
          Send
        </button>
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 ml-2"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Chat;