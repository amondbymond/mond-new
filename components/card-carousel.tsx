"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CardCarouselProps {
  cards: {
    id: number
    title: string
    content: string
  }[]
  className?: string
}

export function CardCarousel({ cards, className }: CardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // 모바일 환경 감지
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1))
  }

  // 카드 너비 계산 (모바일에서는 첫 번째 카드가 80%를 차지하고 두 번째 카드가 20% 보이도록)
  const cardWidth = isMobile ? 80 : 100

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * cardWidth}%)`,
          width: `${cards.length * 100}%`,
        }}
      >
        {cards.map((card, index) => (
          <div key={card.id} className="px-2" style={{ width: `${100 / cards.length}%` }}>
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p>{card.content}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10"
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* 인디케이터 */}
      <div className="flex justify-center mt-4 gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              currentIndex === index ? "w-6 bg-primary" : "w-2 bg-gray-300"
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  )
}
