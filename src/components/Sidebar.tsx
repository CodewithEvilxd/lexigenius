"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { History, ChevronRight, ChevronLeft, LogOut, Home } from "lucide-react";
import { RiAiGenerateText } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";
import { useAuth } from "@/lib/useAuth";
import Tooltip from "./Tooltip";
import { handleLogout } from "@/lib/logoutHelper";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard/generate", label: "Generate", icon: RiAiGenerateText },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/chatbot", label: "Chatbot", icon: BsChatDots },
];

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentUser = useAuth();

  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();

  const onLogout = async () => {
    setLogoutLoading(true);
    try {
      await handleLogout();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLogoutLoading(false);
      router.push("/auth/login");
    }
  };

  return (
    <aside
      className={`${
        isOpen ? "w-full md:w-56" : "w-14 "
      }  h-[92vh] p-3 transition-width duration-300 fixed dark:bg-[#000000] z-[999] shadow-sm md:shadow-md shadow-zinc-300 md:shadow-zinc-500 bg-[#ffffff] dark:shadow-[#303030] md:dark:shadow-[#4f4f4f]`}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={` flex items-center justify-center gap-1 p-1 top-1 rounded-md   absolute left-2 transition-all duration-300`}
      >
        {currentUser?.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt="User profile"
            className={`rounded-full ${
              isOpen ? "w-12" : "w-8"
            } transition-all duration-300 cursor-pointer`}
          />
        ) : (
          <div
            className={`rounded-full flex items-center justify-center bg-gray-300 dark:bg-gray-600 ${
              isOpen ? "w-12 h-12" : "w-8 h-8"
            } transition-all duration-300 cursor-pointer`}
          >
            <span className="font-bold text-white">
              {currentUser?.displayName?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Always render, but control visibility */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isOpen ? "opacity-100 max-w-[200px] ml-1" : "opacity-0 max-w-0 ml-0"
          }`}
        >
          <h1 className="text-md font-semibold md:text-sm dark:text-zinc-400 text-zinc-500 whitespace-nowrap">
            {currentUser?.displayName}
          </h1>
          <h2 className="text-xs dark:text-zinc-500 text-zinc-400 whitespace-nowrap">
            {currentUser?.email}
          </h2>
        </div>
      </div>

      <nav
        className={`flex flex-col gap-4   transition-all duration-300 ${
          isOpen ? "mt-20" : "mt-14"
        }   `}
      >
        {links.map(({ href, label, icon: Icon }, index) => (
          <Link
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setIsOpen(false)}
            key={href}
            href={href}
            className={`relative border-b-2 transition-all duration-200  flex items-center p-2 rounded-md
              ${
                pathname === href
                  ? " border-orange-600   text-orange-600 dark:text-orange-500"
                  : "dark:text-orange-700  hover:border-orange-400 text-orange-400 hover:dark:border-orange-700 border-transparent  "
              }
      `}
          >
            {/* Icon wrapper: fixed size, animated inner icon */}
            <div className="w-6 h-6 flex items-center justify-center">
              <Icon
                className={`transition-all duration-300 ${
                  isOpen ? "w-5 h-5" : "w-4 h-4"
                }`}
              />
            </div>

            <Tooltip label={label} show={hoveredIndex === index && !isOpen} />

            {/* Label container: always present, fades and expands smoothly */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out
                ${
                  isOpen
                    ? "ml-2 max-w-[200px] opacity-100"
                    : "ml-0 max-w-0 opacity-0"
                }
                `}
            >
              <span className="whitespace-nowrap text-md md:text-sm">
                {label}
              </span>
            </div>
          </Link>
        ))}
      </nav>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`mb-6 text-red-900  bottom-48 dark:text-red-300 bg-red-500 p-1 absolute rounded-full ${
          isOpen ? "-right-0 md:-right-2.5 " : "-right-3 "
        }`}
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div
        className={`hover:border-red-500 border-l-2 border-transparent flex transition-all duration-200 items-center gap-2 p-2 rounded-md  justify-start text-red-500 fixed bottom-2 cursor-pointer `}
        onMouseEnter={() => setHoveredIndex(4)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={onLogout}
      >
        <div className=" rounded-lg cursor-pointer w-6 h-6 flex items-center justify-center  ">
          <LogOut
            className={`transition-all duration-200 ${
              isOpen ? "w-5 h-5" : "w-4 h-4"
            }`}
          />
          <Tooltip show={hoveredIndex === 4 && !isOpen} label="Logout" />
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out
                ${
                  isOpen
                    ? "ml-2 max-w-[200px] opacity-100"
                    : "ml-0 max-w-0 opacity-0"
                }
                `}
        >
          <span className="whitespace-nowrap text-sm">
            {logoutLoading ? "Logging out.." : "Logout"}
          </span>
        </div>
      </div>
    </aside>
  );
}