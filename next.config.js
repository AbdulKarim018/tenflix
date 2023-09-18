/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'uhdtv.io',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'mango.blender.org',
        port: '',
        pathname: '/wp-content/uploads/2013/05/**',
      },
      {
        protocol: 'https',
        hostname: 'download.blender.org',
        port: '',
        pathname: '/ED/**',
      },
      {
        protocol: 'https',
        hostname: 'flxt.tmsimg.com',
        port: '',
        pathname: '/assets/**',
      },
    ],
  },
}

module.exports = nextConfig
