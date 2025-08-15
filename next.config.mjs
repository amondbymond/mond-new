/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/service',
        destination: 'https://main.dpvdj8dsmc7us.amplifyapp.com/',
      },
      {
        source: '/service/:path+',
        destination: 'https://main.dpvdj8dsmc7us.amplifyapp.com/:path+',
      },
    ]
  },
}

export default nextConfig