'use client'

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
       const user = useAuth(); // returns: undefined (loading), null (logged out), User
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/auth/login');
    }
  }, [user, router]);

  // 🧠 Optional loading state
  if (user === undefined) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-md text-zinc-500">Checking authentication...</p>
      </div>
    );
  }

  if (user === null) {
    return null; // prevent flicker while redirecting
  }

  return (
    <div className="flex  min-h-[100vh] overflow-x-hidden  bg-[#ffffffb0] dark:bg-[#0101019e]">
        <Header />
      <div className="flex mt-16 justify-between w-full ">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <main className={` h-auto flex  sm:pr-0  items-start  sm:justify-center  w-full ${isOpen ? 'md:ml-52 lg:ml-56' : 'ml-0'} transition-all duration-200`}>{children}</main>
      </div>
    </div>
  );
}