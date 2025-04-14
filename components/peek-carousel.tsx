"use client"

import { useEffect, useRef, useState } from "react"
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

interface PeekCarouselProps {
  cards: TrendCard[]
  className?: string
}

export function PeekCarousel({ cards, className }: PeekCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // 컨테이너 너비 측정
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerWidth(entry.contentRect.width)
        }
      })

      resizeObserver.observe(containerRef.current)

      return () => {
        if (containerRef.current) {
          resizeObserver.unobserve(containerRef.current)
        }
      }
    }
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1))
  }

  // 카드 너비 계산 (첫 번째 카드가 85%를 차지하고 두 번째 카드가 15% 보이도록)
  const cardWidth = containerWidth * 0.85
  const translateX = currentIndex * cardWidth

  return (
    <div className={cn("relative", className)}>
      <div ref={containerRef} className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              style={{
                width: `${cardWidth}px`,
                flexShrink: 0,
                paddingRight: "8px",
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
