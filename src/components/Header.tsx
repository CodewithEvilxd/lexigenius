"use client";
import React, {useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";
import GradientText from "./ui/GradientText";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { handleLogout } from "@/lib/logoutHelper";
import { Palette } from 'lucide-react';

type HeaderProps = {
  onOpenBackgroundSelector: () => void;
};

const Header = ({ onOpenBackgroundSelector }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const user = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      if (user) {
        await handleLogout();
        return;
      }

      router.push("/auth/login");
    } catch (error) {
      console.error("❌ Login/Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.header
      key={isHome ? "home" : "other"}
      initial={isHome ? { opacity: 0 } : false}
      animate={isHome ? { opacity: 1 } : false}
      transition={{
        delay: 4,
        duration: 0.5,
        ease: "easeInOut",
      }}
      className={`h-16  z-[1000] top-0  dark:shadow-[#30303079] px-4 md:px-14 flex items-center justify-between fixed w-full left-0 
    shadow-sm md:shadow-md bg-[#ffffff] dark:bg-[#000000]  ${
      isHome ? "opacity-0" : ""
    }`}
    >
      <div className="flex items-center">
        <GradientText
          colors={["#ff4d4d", "#ffa500", "#ffff66", "#ffa500", "#ff4d4d"]}
          animationSpeed={12}
          showBorder={false}
          className="text-xl whitespace-nowrap "
        >
          LexiGenius
        </GradientText>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={handleLogin}
          type="submit"
          className={`py-[0.35rem] sm:py-1 px-3 cursor-pointer text-sm sm:text-[1rem] font-semibold shadow  border-b-[1px] rounded-lg border-transparent hover:border-orange-600 bg-[#eeeeee]  dark:bg-[#222]`}
        >
          <span
            style={{
              background:
                "linear-gradient(90deg,rgba(255, 113, 25, 1) 50%, rgba(255, 0, 0, 1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            {user ? "Logout" : loading ? "Logging out.." : "Login"}
          </span>
        </button>

        <ThemeToggle />

        <button
          onClick={onOpenBackgroundSelector}
          title="Change Background"
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <Palette className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </motion.header>
  );
};

export default Header;