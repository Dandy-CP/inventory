import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'duawimtodkhpwpbmgrwx.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
