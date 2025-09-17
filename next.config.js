/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // disable persistent cache in dev to avoid "Unable to snapshot resolve dependencies"
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;
