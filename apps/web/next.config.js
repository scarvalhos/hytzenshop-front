/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
    '@luma/ui',
    '@hytzenshop/hooks',
    '@hytzenshop/types',
    '@hytzenshop/helpers',
    '@hytzenshop/services'
])

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: { dirs: ['src', 'pages'] },
    images: {
        domains: ['images.pexels.com', 'hytzenshop.s3.amazonaws.com', 'www.kangu.com.br'],
    },
}

module.exports = withTM(nextConfig)
