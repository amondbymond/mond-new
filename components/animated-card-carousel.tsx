"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCardCarouselProps {
  cards: {
    id: number
    title: string
    content: string
  }[]
  className?: string
}

export function AnimatedCardCarousel({ cards, className }: AnimatedCardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        // 모바일에서는 첫 번째 카드가 90%를 차지하고 두 번째 카드가 10% 보이도록 설정
        const isMobile = window.innerWidth <= 768
        const cardWidth = carouselRef.current.offsetWidth * (isMobile ? 0.9 : 1)
        setWidth(cardWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)

    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [])

  useEffect(() => {
    controls.start({
      x: -currentIndex * width,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    })
  }, [currentIndex, width, controls])

  const nextSlide = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(cards.length - 1)
    }
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
    <div className={cn("relative overflow-hidden", className)} ref={carouselRef}>
      <motion.div
        className="flex"
        animate={controls}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {cards.map((card) => (
          <div key={card.id} className="flex-shrink-0 px-2" style={{ width }}>
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p>{card.content}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </motion.div>

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
