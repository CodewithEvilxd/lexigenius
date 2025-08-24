"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <motion.footer
      key={isHome ? "home" : "other"}
      initial={isHome ? { opacity: 0 } : false}
      animate={isHome ? { opacity: 1 } : false}
      transition={{
        delay: 4,
        duration: 0.5,
        ease: "easeInOut",
      }}
      className={`
  flex items-end justify-end right-0 py-1 pr-2 sm:pr-2  overflow-hidden
  ${isHome ? "opacity-0 fixed bottom-0" : "static"}
`}
    >
      <p className=" text-[0.7rem]  sm:mt-0 sm:text-sm text-[#868686] dark:text-[#434343]">
        Built with ❤️ by{" "}
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:dark:text-neutral-300  hover:text-neutral-700  transition-colors font-semibold"
        >
          @RAj
        </a>{" "}
        © {new Date().getFullYear()}
      </p>
    </motion.footer>
  );
}
