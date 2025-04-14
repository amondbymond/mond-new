"use client"

import type React from "react"

import { useRef, useState } from "react"
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

interface TrendCarouselProps {
  cards: TrendCard[]
  className?: string
}

export function TrendCarousel({ cards, className }: TrendCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // 카드 너비 계산 (첫 번째 카드가 85%를 차지하고 두 번째 카드가 15% 보이도록)
  const firstCardWidth = 85

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1))
  }

  // 터치 이벤트 처리를 위한 상태
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // 왼쪽으로 스와이프
      nextSlide()
    }

    if (touchStart - touchEnd < -50) {
      // 오른쪽으로 스와이프
      prevSlide()
    }
  }

  return (
    <div className={cn("relative w-full overflow-hidden", className)} ref={carouselRef}>
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * firstCardWidth}%)`,
          width: `${(cards.length * 100) / (firstCardWidth / 100)}%`, // 전체 너비 조정
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="px-2"
            style={{
              width: `${firstCardWidth}%`, // 각 카드의 너비를 85%로 설정
              flexShrink: 0,
            }}
          >
            <Card className="h-full overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image src={card.image || "/placeholder.svg"} alt={card.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                      </div>
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
