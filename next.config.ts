import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ensure static files are served correctly
  async headers() {
    return [
      {
        source: '/:path*.mp4',
        headers: [
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'interviewmagazine.com',
      },
      {
        protocol: 'https',
        hostname: '**.interviewmagazine.com',
      },
      {
        protocol: 'https',
        hostname: 'indiewire.com',
      },
      {
        protocol: 'https',
        hostname: '**.indiewire.com',
      },
      {
        protocol: 'https',
        hostname: 'newsbytesapp.com',
      },
      {
        protocol: 'https',
        hostname: '**.newsbytesapp.com',
      },
      {
        protocol: 'https',
        hostname: 'deadline.com',
      },
      {
        protocol: 'https',
        hostname: '**.deadline.com',
      },
    ],
  },
};

export default nextConfig;
