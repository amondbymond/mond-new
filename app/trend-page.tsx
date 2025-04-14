import { TrendCarousel } from "@/components/trend-carousel"

export default function TrendPage() {
  // 트렌드 카드 데이터
  const trendCards = [
    {
      id: 1,
      title: "릴스",
      description: "서비스 본질에 집중한 콘텐츠를 기획하세요.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: "SNS 이벤트",
      description: "참여를 유도하는 이벤트로 고객과 소통하세요.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "체험단",
      description: "실제 사용자의 경험을 통해 신뢰를 쌓으세요.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      title: "프로모션",
      description: "효과적인 프로모션으로 매출을 증대하세요.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <main className="min-h-screen bg-[#e6f2f5] p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-[#FF9500] mb-2 text-center">
          1천 개 이상의 분야별 트렌드 콘텐츠 아이디어
        </h1>

        <h2 className="text-xl font-bold text-center mb-6">
          릴스, SNS 이벤트, 체험단,
          <br />
          프로모션 등<br />
          모든 콘텐츠를 한 곳에
        </h2>

        {/* 두 번째 카드가 살짝 보이는 트렌드 캐러셀 */}
        <div className="mb-8">
          <TrendCarousel cards={trendCards} />
        </div>
      </div>
    </main>
  )
}
