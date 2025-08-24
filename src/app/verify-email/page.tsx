"use client";

import { applyActionCode } from "firebase/auth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "../../lib/firebase";
import { useAuth } from "@/lib/useAuth";

export default function Page() {
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const user = useAuth();
  console.log(user);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const mode = searchParams.get("mode");
    const oobCode = searchParams.get("oobCode");

    // Secure check
    if (mode === "verifyEmail" && oobCode) {
      applyActionCode(auth, oobCode)
        .then(async () => {
          setStatus("success");
          await auth.signOut(); // Optional: force sign-out if user was auto-logged in
        })
        .catch(() => {
          setStatus("error");
        });
    } else {
      setStatus("error");
    }
  }, []);

  if (status === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-700 dark:text-gray-300">
        ⏳ Verifying your email...
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="dark:bg-[#000000d6] bg-[#ffffffa4] p-8 rounded-xl shadow-xl max-w-md w-full text-center backdrop-blur-md">
          <div className="text-red-600 text-4xl mb-2">❌</div>
          <h1 className="text-2xl font-bold text-red-700 dark:text-red-500">
            Verification Failed
          </h1>
          <p className="mt-3 text-gray-700 dark:text-gray-300">
            The link is invalid, expired, or already used.
          </p>
          {user === undefined ? (
            <p className="text-center text-sm text-gray-500">
              Checking authentication...
            </p>
          ) : user ? (
            <Link
              href="/dashboard/generate"
              className="inline-block mt-6 w-full py-2 px-4 text-white font-semibold rounded-md shadow transition duration-200 bg-orange-600 hover:bg-orange-700 dark:bg-orange-800 hover:dark:bg-orange-900"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="inline-block mt-6 w-full py-2 px-4 text-white font-semibold rounded-md shadow transition duration-200 bg-orange-600 hover:bg-orange-700 dark:bg-orange-800 hover:dark:bg-orange-900"
            >
              Go to Login
            </Link>
          )}
        </div>
      </div>
    );
  }

  // ✅ Success UI (your original code)
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="dark:bg-[#000000d6] bg-[#ffffffa4] p-8 rounded-xl shadow-xl max-w-md w-full text-center backdrop-blur-md">
        <div className="text-green-600 text-4xl mb-2">✅</div>
        <h1 className="text-2xl font-bold text-green-700 dark:text-green-500">
          Email Successfully Verified!
        </h1>
        <p className="mt-3 text-gray-700 dark:text-gray-300">
          Thank you for confirming your email address.
        </p>
        <p className="text-sm mt-1 text-gray-500">
          You&apos;re now ready to log in and start using{" "}
          <strong>LexiGenius AI.</strong>
        </p>

        <Link
          href="/auth/login"
          className="inline-block mt-6 w-full py-2 px-4 text-white font-semibold rounded-md shadow transition duration-200 bg-orange-600 hover:bg-orange-700 dark:bg-orange-800 hover:dark:bg-orange-900"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
