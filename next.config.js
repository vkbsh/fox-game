/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomfox.ca',
      },
      {
        protocol: 'https',
        hostname: 'images.dog.ceo',
      },
    ],
  },
};

module.exports = nextConfig;
