import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Don't advertise the framework in response headers.
  poweredByHeader: false,
  images: {
    // AVIF first (smallest), WebP fallback; next/image negotiates per browser.
    formats: ["image/avif", "image/webp"],
    // Optimised images are content-addressed by URL + width + quality.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
