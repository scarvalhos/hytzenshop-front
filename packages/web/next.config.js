/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@luma/ui'])

const nextConfig = {
    reactStrictMode: true,

    eslint: { dirs: ['src'] },

    images: {
        domains: ['images.pexels.com', 'hytzenshop.s3.amazonaws.com'],
    },
}

module.exports = withTM(nextConfig)
