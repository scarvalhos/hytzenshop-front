/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: { dirs: ['src'] },
  i18n: {
    locales: ['pt-BR'],
    defaultLocale: 'pt-BR',
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'images.pexels.com',
      'encrypted-tbn1.gstatic.com',
      'hytzenshop.s3.amazonaws.com',
    ],
  },
}

module.exports = nextConfig
