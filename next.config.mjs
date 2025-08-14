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
        source: '/service/:path*',
        destination: 'https://main.dpvdj8dsmc7us.amplifyapp.com/service/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/service/service/:path*',
        destination: '/service/:path*',
        permanent: false,
      },
    ]
  },
}

export default nextConfig