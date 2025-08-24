"use client";
import { handleCopy } from "@/lib/copyClipboard";
import { clearAllHistory, deleteHistoryItem } from "@/lib/fireStoreHelpers";
import { useAuth } from "@/lib/useAuth";
import { useHistory } from "@/lib/useHistory";
import { Check, Clipboard, Trash2 } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { User } from "firebase/auth";
import NotificationModal from "@/components/NotificationModal";

export default function History() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [confirmMsg, setConfirmMsg] = useState<string | null>(null);

  const currentUser: User | null | undefined = useAuth();

  const { history, loading } = useHistory(currentUser);

  if (loading) {
    return (
      <p className="text-gray-500 text-md space-y-4 w-[100vw] text-center ml-[2em] md:w-[70vw] rounded-xl  md:ml-0 md:mr-0  md:px-3 py-6  relative">
        Loading history...
      </p>
    );
  }

  if (history.length === 0) {
    return (
      <p className="text-gray-500 text-md space-y-4 w-[100vw] text-center ml-[2em] md:w-[70vw] rounded-xl  md:ml-0 md:mr-0  md:px-3 py-6  relative">
        No history yet
      </p>
    );
  }

  async function handleDelete(id: string) {
    await deleteHistoryItem(id);
  }

  const copyButton = (output: string, index: number) => {
    handleCopy(output, setCopiedIndex, index);
  };

  async function handleClearAll() {
    // const ok = confirm();
    setConfirmMsg("Are you sure you want to clear all history?");

     
  
  }

  return (
    <div className="space-y-4 w-[100vw] ml-[4.2em] pr-2  md:w-[70vw] rounded-xl  md:ml-0 md:mr-0  md:px-3 py-6 mt-2 lg:mt-14 relative ">
      <button
        className=" bg-[#ff3535c3] dark:bg-[#4a1616]  text-red-800 dark:text-red-400 px-3 py-1 right-2 z-30 rounded-md fixed top-[4.5rem] md:top-16  md:right-8 hover:bg-[#ff3535b0]  hover:dark:bg-[#5d2020eb] lg:top-20  "
        onClick={handleClearAll}
      >
        Delete All
      </button>

      {history.map((item, index) => (
        <div key={item.id} className="space-y-2 mb-6 lg:pb-0 pt-10 md:pt-0">
          {/* 🧑 User Message */}
          <div className="flex justify-end items-start gap-2">
            {/* User Bubble */}
            <div
              className="max-w-[100%] md:max-w-[70%]  text-white p-3 rounded-xl rounded-br-none shadow-md text-sm"
              style={{
                background:
                  "linear-gradient(90deg,rgba(255, 113, 25, 1) 1%, rgba(255, 0, 0, 1) 100%)",
              }}
            >
              {item.prompt}
            </div>
            {/* User Icon */}
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold overflow-hidden">
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="User profile" className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold">
                  {currentUser?.displayName?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* 🤖 AI Message */}
          <div className="flex justify-start items-start gap-2 relative">
            {/* AI Icon */}

            <div className="shrink-0 w-8 h-8 rounded-full bg-gray-400 text-white hidden md:flex  items-center justify-center text-xs font-bold dark:bg-gray-700 overflow-hidden">
              <img src="/meta.webp" alt="" />
            </div>

            {/* AI Bubble */}

            <div className="max-w-[100%] md:max-w-[80%] bg-gray-200 dark:bg-[#2c2c2c] text-gray-900 dark:text-gray-200 p-3 rounded-xl rounded-bl-none shadow-md text-sm whitespace-pre-line relative ">
              {/* Type + Timestamp */}

              <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">
                <span className="font-medium">{item.contentType}</span> •{" "}
                {item.createdAt?.seconds
                  ? new Date(item.createdAt.seconds * 1000).toLocaleTimeString()
                  : "Just now"}
              </div>

              <div className="  whitespace-pre-wrap">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {item.result}
                </ReactMarkdown>
              </div>

              {/* Copy & Delete buttons */}
              <div className="absolute top-2 right-2 flex gap-2 text-xs">
                <button
                  onClick={() => copyButton(item.result, index)}
                  title="Copy"
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Clipboard className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  title="Delete"
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {confirmMsg && <NotificationModal title="Confirmation" message={confirmMsg} onConfirm={async() => { if (currentUser) {
        await clearAllHistory(currentUser.uid);
      }}}  onClose={() => setConfirmMsg("")} buttonText="Delete All"/>}
    </div>
  );
}
{
  /* <div className="w-full my-5 bg-zinc-500 h-[1px]"/> */
}
