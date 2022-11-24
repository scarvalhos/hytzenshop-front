/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  eslint: { dirs: ['src'] },

  images: {
    domains: ['images.pexels.com', 'hytzenshop.s3.amazonaws.com'],
  },
}

module.exports = nextConfig
