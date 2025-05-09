import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'i.pravatar.cc', 'github.com'],
    unoptimized: true,
  },
};

export default nextConfig;
