/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
    '@luma/ui',
    '@hytzenshop/hooks',
    '@hytzenshop/types',
    '@hytzenshop/helpers'
])

const nextConfig = {
    reactStrictMode: true,

    eslint: { dirs: ['src'] },

    images: {
        domains: ['images.pexels.com', 'hytzenshop.s3.amazonaws.com', 'www.kangu.com.br'],
    },
}

module.exports = withTM(nextConfig)
