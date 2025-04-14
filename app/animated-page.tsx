import { AnimatedCardCarousel } from "@/components/animated-card-carousel"

export default function AnimatedPage() {
  // 샘플 카드 데이터
  const cards = [
    {
      id: 1,
      title: "첫 번째 카드",
      content: "이것은 첫 번째 카드의 내용입니다. 왼쪽으로 슬라이드하여 더 많은 카드를 확인하세요.",
    },
    {
      id: 2,
      title: "두 번째 카드",
      content: "이것은 두 번째 카드의 내용입니다. 계속해서 슬라이드하여 모든 카드를 확인하세요.",
    },
    {
      id: 3,
      title: "세 번째 카드",
      content: "이것은 세 번째 카드의 내용입니다. 마지막 카드입니다.",
    },
  ]

  return (
    <main className="min-h-screen p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">애니메이션 랜딩 페이지</h1>

      {/* 모바일에서 두 번째 카드가 살짝 보이는 애니메이션 캐러셀 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">특별 기능</h2>
        <div className="md:px-12">
          <AnimatedCardCarousel cards={cards} className="mb-8" />
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">← 좌우로 슬라이드하여 더 많은 내용을 확인하세요 →</p>
      </section>

      {/* 추가 콘텐츠 섹션 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">주요 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.id} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p>{card.content}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
