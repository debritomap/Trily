/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "local-origin.dev",
    "*.local-origin.dev",
    "http://192.168.15.186:3000",
  ],
};

module.exports = nextConfig;
