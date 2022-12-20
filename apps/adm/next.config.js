/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
    '@luma/ui',
    '@hytzenshop/hooks',
    '@hytzenshop/types',
    '@hytzenshop/helpers'
])

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

module.exports = withTM(nextConfig)
