"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [showPeriod, setShowPeriod] = useState(true)

  // Toggle between versions every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPeriod((prev) => !prev)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="relative w-full max-w-3xl px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={showPeriod ? "with-period" : "without-period"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-amber-800 mb-8">
              아몬드 하나면 끝{showPeriod ? "." : ""}
            </h1>
            <p className="text-amber-700 text-lg mb-4">
              {showPeriod ? "현재 텍스트: 마침표 있음" : "현재 텍스트: 마침표 없음"}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowPeriod((prev) => !prev)}
            className="px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
          >
            텍스트 전환하기
          </button>
        </div>
      </div>
    </main>
  )
}
