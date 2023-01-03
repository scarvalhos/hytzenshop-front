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
    i18n: {
        locales: ['pt-BR'],
        defaultLocale: 'pt-BR',
    },
    images: {
        domains: [
            'images.pexels.com',
            'encrypted-tbn1.gstatic.com',
            'hytzenshop.s3.amazonaws.com',
        ],
    },
}

module.exports = withTM(nextConfig)
