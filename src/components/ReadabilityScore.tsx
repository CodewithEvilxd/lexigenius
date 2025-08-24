"use client";

import { motion } from "framer-motion";

interface ReadabilityScoreProps {
  score: number | null;
}

const ReadabilityScore: React.FC<ReadabilityScoreProps> = ({ score }) => {
  if (score === null) {
    return null;
  }

  const getScoreColor = () => {
    if (score >= 90) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="w-full max-w-4xl mx-auto my-12 p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Readability Score (Flesch-Kincaid)
      </h2>
      <div className="text-center">
        <p className={`text-4xl font-bold ${getScoreColor()}`}>{score.toFixed(2)}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Higher is better</p>
      </div>
    </motion.div>
  );
};

export default ReadabilityScore;
