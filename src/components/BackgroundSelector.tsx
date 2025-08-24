"use client";

import React from 'react';
import { backgrounds, Background } from '../lib/backgrounds';

type Props = {
  isOpen: boolean;
  onSelect: (style: React.CSSProperties) => void;
  onClose: () => void;
};

export default function BackgroundSelector({ isOpen, onSelect, onClose }: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}>
      <div 
        className="fixed top-20 right-1/2 translate-x-1/2 md:right-4 md:translate-x-0 bg-gray-900 p-4 rounded-lg shadow-lg z-50 w-[90vw] max-w-md animate-fade-in-down max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the panel
      >
        <h3 className="text-white text-lg mb-4 font-semibold">Choose Background</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {backgrounds.map((bg) => (
            <div key={bg.id} className="cursor-pointer group" onClick={() => onSelect(bg.style)}>
              <div
                className="w-full h-24 rounded-md border-2 border-gray-700 group-hover:border-orange-500 transition-colors duration-200"
                style={bg.style}
              />
              <p className="text-gray-300 text-sm text-center mt-2 group-hover:text-orange-500 transition-colors duration-200">{bg.name}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
}