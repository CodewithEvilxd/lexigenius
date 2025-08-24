"use client";

import { motion } from "framer-motion";

interface SeoSuggestionsProps {
  suggestions: string[];
}

const SeoSuggestions: React.FC<SeoSuggestionsProps> = ({ suggestions }) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="w-full max-w-4xl mx-auto my-12 p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        SEO Suggestions
      </h2>
      <ul className="list-disc list-inside space-y-2">
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SeoSuggestions;
