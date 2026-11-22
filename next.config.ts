import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/blog/internet-u-:city', destination: '/', permanent: true },
      { source: '/blog/internet-v-:city', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
