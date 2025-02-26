/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json'
    });
    return config;
  },
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://fifeefofum.com',
  },
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
};

module.exports = nextConfig;