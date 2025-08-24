const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  cacheId: "lexigenius-pwa",
  manifest: {
    name: "LexiGenius",
    short_name: "LexiGenius",
    description: "An AI-powered writing assistant.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/image.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/image.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ["ui-avatars.com", "lh3.googleusercontent.com"],
  },
};

module.exports = withPWA(nextConfig);
