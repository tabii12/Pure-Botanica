import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ['http://192.168.1.11:3000'], // Thay địa chỉ IP và port nếu cần
  },
};

export default nextConfig;
