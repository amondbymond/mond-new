import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mond.io.kr";
  return [
    { url: `${base}/`, lastModified: new Date() },
    // 여기에 실제 공개 페이지가 생기면 한 줄씩 추가
    // { url: `${base}/pricing`, lastModified: new Date() },
    // { url: `${base}/about`, lastModified: new Date() },
  ];
}
