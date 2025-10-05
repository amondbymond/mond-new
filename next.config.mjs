// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },

  // ✅ CSP를 헤더로 적용 (옵션 B)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "upgrade-insecure-requests" },
        ],
      },
    ];
  },

  // Removed rewrites - using subdomain instead
};

export default nextConfig;
