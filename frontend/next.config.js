/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "local-origin.dev",
    "*.local-origin.dev",
    "http://192.168.15.186:3000",
  ],
};

module.exports = nextConfig;
