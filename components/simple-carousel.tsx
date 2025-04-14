"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TrendCard {
  id: number
  title: string
  description: string
  image: string
}

interface SimpleCarouselProps {
  cards: TrendCard[]
  className?: string
}

export function SimpleCarousel({ cards, className }: SimpleCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1))
  }

  return (
    <div className={cn("relative w-full", className)}>
      {/* 캐러셀 컨테이너 */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 85}%)`,
            width: `${cards.length * 100}%`,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="px-1"
              style={{
                width: `${85}%`, // 첫 번째 카드가 85%를 차지하여 두 번째 카드가 15% 보이도록 함
              }}
            >
              <Card className="h-full overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image src={card.image || "/placeholder.svg"} alt={card.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-700">{card.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
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
