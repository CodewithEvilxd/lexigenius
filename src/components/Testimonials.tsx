"use client";
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "LexiGenius AI has transformed the way I write. I can now create high-quality content in a fraction of the time.",
    name: "John Doe",
    title: "Content Creator",
  },
  {
    quote: "The best AI writing assistant I've ever used. It's intuitive, powerful, and the results are outstanding.",
    name: "Jane Smith",
    title: "Marketing Manager",
  },
  {
    quote: "I was skeptical at first, but LexiGenius AI has exceeded all my expectations. It's a game-changer for my business.",
    name: "Samuel Green",
    title: "Entrepreneur",
  },
];

const Testimonials = () => {
  return (
    <div className="w-full max-w-6xl mx-auto my-12 p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          >
            <p className="text-lg italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
            <p className="font-bold text-right">- {testimonial.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-right">{testimonial.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
