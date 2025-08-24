/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6A0572', // A deep, rich purple
        secondary: '#FF8C00', // A vibrant orange
        accent: '#2C3E50', // A deep, almost black blue-gray for contrast
        'text-primary': '#CED4DA', // Slightly lighter gray for text on light backgrounds
        'text-secondary': '#F8F9FA', // Soft white for text on dark backgrounds
        'bg-primary-light': '#F0F2F5', // Very light gray for light mode background
        'bg-primary-dark': '#1A1A1A', // Deep, almost black, background
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  // plugins: [require('@tailwindcss/typography')],
};
