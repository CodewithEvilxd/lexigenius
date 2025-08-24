const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ui-avatars.com", "lh3.googleusercontent.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "unsafe-none", // ✅ relax COOP to prevent warning
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none", // ✅ avoid COEP issues
          },
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);

