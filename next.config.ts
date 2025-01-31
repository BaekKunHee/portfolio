import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'prod-files-secure.s3.us-west-2.amazonaws.com',
      's3.us-west-2.amazonaws.com',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  optimizeFonts: true,
};

export default nextConfig;
