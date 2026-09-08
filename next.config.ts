import type { NextConfig } from 'next';

const isPagesBuild = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = isPagesBuild ? {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
} : {};

export default nextConfig;
