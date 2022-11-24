/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: { dirs: ['src'] },
  i18n: {
    locales: ['pt-BR'],
    defaultLocale: 'pt-BR',
  },
  images: {
    domains: [
      'images.pexels.com',
      'hytzenshop.s3.amazonaws.com',
    ],
  },
}

module.exports = nextConfig
