"use client";

import { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset email sent! Check your inbox.");
      setShowMessage(true);
   } catch (error: unknown) {
  if (error instanceof Error) {
    setMessage("❌ Error: " + error.message);
  } else {
    setMessage("❌ Unknown error occurred");
  }
  setShowMessage(true);
}

  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
        setMessage("");
        setEmail("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow max-w-md w-full text-center dark:bg-[#000000d6] bg-[#ffffffa4]">
        {showMessage ? (
          <p className="text-orange-600 font-medium text-lg">{message}</p>
        ) : (
          <>
            <h2 className="text-md font-semibold mb-6 dark:text-[#b1b1b1] text-zinc-600">
              Forgot Password
            </h2>

            <form onSubmit={handleReset} className="space-y-4">
              <Input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="dark:text-zinc-300 text-zinc-600 placeholder:dark:text-zinc-700 placeholder:text-zinc-400 mt-1 block w-full rounded-md shadow-sm disabled:opacity-60 disabled:cursor-not-allowed focus:dark:border-orange-800 border-zinc-300 dark:border-zinc-800 focus:border-orange-400"
                placeholder="you@example.com"
              />

              <button
                type="submit"
                className={cn(
                  "w-full py-2 px-4 text-md cursor-pointer text-white font-normal rounded-md shadow hover:dark:bg-orange-900 hover:bg-orange-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-orange-600 dark:bg-orange-800"
                )}
              >
                Send Reset Link
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
