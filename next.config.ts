/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-zeal.onrender.com',
        pathname: '/images/**', // Tùy chọn: Chỉ cho phép đường dẫn /images/
      },
    ],
  },
};

module.exports = nextConfig;