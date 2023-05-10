/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: ['http2.mlstatic.com']
  }
}

module.exports = nextConfig
