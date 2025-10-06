// app/sitemap.ts
import type { MetadataRoute } from "next";
export const dynamic = "force-static";  // ✅ 정적 생성 보장

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mond.io.kr";
  return [
    { url: `${base}/`, lastModified: new Date() },
    // 공개 페이지 생기면 아래처럼 줄 추가
    // { url: `${base}/pricing`, lastModified: new Date() },
  ];
}
