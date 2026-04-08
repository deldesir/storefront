import { configHeader } from '@/utils/constants';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_BASE_PATH || '',
  assetPrefix: process.env.NEXT_BASE_PATH || '',
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
  async headers() {
    return configHeader;
  },
  compress: true, 
  experimental: {
    optimizePackageImports: ["lodash", "date-fns"],
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
