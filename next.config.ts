const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ["ui-avatars.com", "lh3.googleusercontent.com"],
  },
};

module.exports = withPWA(nextConfig);
