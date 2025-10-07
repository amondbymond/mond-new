import type React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "마케팅 AI 에이전트, 아몬드랩",
  description:
    "주제별 트렌드에 딱 맞는 터지는 콘텐츠 기획을 쉽고 간편하게 시작해보세요!",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
  },
  openGraph: {
    title: "아몬드랩 - 텍스트 기반 AI 콘텐츠 제작 서비스",
    description:
      "주제별 트렌드에 딱 맞는 터지는 콘텐츠 기획을 쉽고 간편하게 시작해보세요!",
    images: [{ url: "/og-image.jpeg", width: 1200, height: 630, alt: "아몬드랩" }],
    type: "website",
    locale: "ko_KR",
  },

  // ✅ 여기 3줄이 핵심 (정규 URL/인덱싱 허용)
  metadataBase: new URL("https://mond.io.kr"),
  alternates: { canonical: "https://mond.io.kr" },
  robots: { index: true, follow: true },

  // 🔑 네이버 소유확인 메타태그 — Metadata API로 주입
  other: {
    "naver-site-verification": "d192255a23327d76b12ae5c368c9020f9be869a9",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}

        {/* ✅ GA 스크립트는 body 안쪽에 배치 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1T0LX8V678"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1T0LX8V678');
          `}
        </Script>
      </body>
    </html>
  );
}
