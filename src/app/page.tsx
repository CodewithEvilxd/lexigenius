"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BlurText from "@/components/ui/BlurText";
import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";
import { useAuth } from "@/lib/useAuth";

const Page = () => {

  const isMobile = useIsMobile();
  const [hasMounted, setHasMounted] = useState(false);
  const user = useAuth();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Prevent rendering until client-side to avoid hydration mismatch
  if (!hasMounted) return null;

  const initialScale = isMobile ? 1.2 : 2.2; // More visible difference

  return (


    <div className="p-6 min-h-screen relative overflow-hidden  flex items-center justify-center flex-col ">
      <motion.div
        initial={{ scale: initialScale }}
        animate={{ scale: 1.2 }}
        transition={{ delay: 3, duration: 0.6, ease: "easeInOut" }}
        className="flex items-center flex-col justify-center md:gap-1"
      >
        <BlurText
          text="Elevate Your Words with"
          delay={150}
          animateBy="words"
          direction="top"
          className={`text-2xl md:text-5xl font-bold tracking-tight text-center `}
        />
        <BlurText
          text="LexiGenius AI"
          delay={1000}
          animateBy="words"
          direction="top"
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-center "
          stepDuration={0.8}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 0.5, ease: "easeInOut" }}
        className="text-lg md:text-xl text-center text-orange-600 dark:text-[#ff9c75e2] max-w-2xl mx-auto mt-8"
      >
        <>
          Command your narrative. LexiGenius AI empowers professionals to generate polished, impactful content, from persuasive emails to engaging social media, effortlessly.{" "}
          <span
            className="bg-gradient-to-r from-[#ff000058] dark:from-[#812e2ef5]  to-[#33ffc200] rounded-xl px-1
"
          >
            Generate emails, LinkedIn posts, Cold emails and more
          </span>{" "}
          in seconds.
        </>
      </motion.p>

      <motion.div
        className="mt-6 flex justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 0.5, ease: "easeInOut" }}
      >
        <Link href={user ? "/dashboard/generate" : "/auth/login"}>
          <button className="glow-button text-white font-semibold px-6 py-3 rounded-md flex items-center gap-2">
            Get Started for Free
          </button>
        </Link>
      </motion.div>
      
    </div>
        
  );
};

export default Page;
