/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['v0.blob.com', 'res.cloudinary.com'],
  },
  // 비디오 파일 처리를 위한 웹팩 설정 - 수정된 방식
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/videos/[name].[hash][ext]',
      },
    });

    return config;
  },
  // 파일 시스템 감시 설정 최적화
  onDemandEntries: {
    // 페이지 캐싱 시간 증가 (ms)
    maxInactiveAge: 60 * 60 * 1000,
    // 동시에 캐시할 페이지 수 감소
    pagesBufferLength: 2,
  },
  // 개발 서버 설정
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
