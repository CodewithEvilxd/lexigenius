"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const InteractiveDemo = () => {
  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!inputText) return;
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setGeneratedText(`This is a generated result for: "${inputText}"`);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="w-full max-w-4xl mx-auto my-12 p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Try LexiGenius AI Live!
      </h2>
      <textarea
        className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700"
        placeholder="Enter some text to see the magic..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className="flex justify-center mt-4">
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="glow-button text-white font-semibold px-8 py-3 rounded-md flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>
      {generatedText && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="font-semibold">Result:</h3>
          <p>{generatedText}</p>
        </div>
      )}
    </motion.div>
  );
};

export default InteractiveDemo;
