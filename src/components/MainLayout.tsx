"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundSelector from "@/components/BackgroundSelector";
import { backgrounds } from "@/lib/backgrounds";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties>(backgrounds[0].style);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  useEffect(() => {
    const savedBg = localStorage.getItem('selectedBackground');
    if (savedBg) {
      try {
        setBackgroundStyle(JSON.parse(savedBg));
      } catch (error) {
        console.error("Failed to parse saved background style:", error);
        // Fallback to default if parsing fails
        setBackgroundStyle(backgrounds[0].style);
      }
    }
  }, []);

  const handleSelectBackground = (style: React.CSSProperties) => {
    setBackgroundStyle(style);
    localStorage.setItem('selectedBackground', JSON.stringify(style));
    setIsSelectorOpen(false);
  };

  return (
    <main className="relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 transition-all duration-500"
        style={backgroundStyle}
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header onOpenBackgroundSelector={() => setIsSelectorOpen(true)} />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
      <BackgroundSelector
        isOpen={isSelectorOpen}
        onSelect={handleSelectBackground}
        onClose={() => setIsSelectorOpen(false)}
      />
    </main>
  );
}