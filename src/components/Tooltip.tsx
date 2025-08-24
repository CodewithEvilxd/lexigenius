// components/Tooltip.tsx
import React from "react";

interface TooltipProps {
  label: string;
  show: boolean;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ label, show, className = "" }) => {
  if (!show) return null;

  return (
    <div
      className={`hidden md:flex absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 ${className}`}
    >
      <div className="relative bg-zinc-400 dark:bg-zinc-800 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap">
        {label}
        {/* Arrow */}
        <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-zinc-400 dark:border-r-zinc-800" />
      </div>
    </div>
  );
};

export default Tooltip;
