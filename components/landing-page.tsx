"use client"

import { useEffect, useState, type FormEvent } from "react"
import { SuccessModal } from "./success-modal"
import { ContentTabs } from "./content-tabs"
import { FeatureBoxes } from "./feature-boxes"
import { ContentCarousel } from "./content-carousel"
import { FeatureHighlight } from "./feature-highlight"
import { usePhoneFormat } from "@/hooks/use-phone-format"
import { AlternatingFeatures } from "./alternating-features"
import { AnimatedBubble } from "./animated-bubble"

export default function LandingPage() {
  const [showModal, setShowModal] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const { handlePhoneChange } = usePhoneFormat()

  // Hero animation on load
  useEffect(() => {
    // Small delay to ensure animation runs after page load
    const timer = setTimeout(() => {
      setHeroVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // 폼 제출 처리
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const purpose = formData.get("purpose") as string
    const adConsent = formData.get("marketing") === "on"

    // 강화된 유효성 검사
    if (!email.trim()) {
      setFormError("이메일을 입력해주세요.")
      setIsSubmitting(false)
      return
    }

    if (!phone.trim()) {
      setFormError("전화번호를 입력해주세요.")
      setIsSubmitting(false)
      return
    }

    if (!purpose) {
      setFormError("사용 목적을 선택해주세요.")
      setIsSubmitting(false)
      return
    }

    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setFormError("유효한 이메일 주소를 입력해주세요.")
      setIsSubmitting(false)
      return
    }

    // 전화번호 형식 검사 (간단한 검사)
    const phoneRegex = /^[0-9-]+$/
    if (!phoneRegex.test(phone)) {
      setFormError("유효한 전화번호를 입력해주세요.")
      setIsSubmitting(false)
      return
    }

    const formDataObj = {
      email,
      phone,
      purpose,
      adConsent,
      timestamp: new Date().toISOString(),
    }

    console.log("폼 데이터:", formDataObj)

    // API 호출
    try {
      console.log("API 호출 시작")

      // 수정된 부분: fetch 요청 및 응답 처리 개선
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataObj),
      })

      // 응답 텍스트 먼저 가져오기
      const responseText = await response.text()
      console.log("API 응답 텍스트:", responseText)

      // 응답이 비어있지 않은 경우에만 JSON으로 파싱
      let responseData
      if (responseText) {
        try {
          responseData = JSON.parse(responseText)
          console.log("API 응답 데이터:", responseData)
        } catch (parseError) {
          console.error("API 응답 파싱 오류:", parseError)
          throw new Error("서버 응답을 처리할 수 없습니다.")
        }
      } else {
        console.error("API 응답이 비어있습니다.")
        throw new Error("서버로부터 응답이 없습니다.")
      }

      if (!response.ok) {
        throw new Error(responseData?.error || "서버로부터 오류 응답")
      }

      // 폼 초기화
      form.reset()

      // 성공 모달 표시
      setShowModal(true)
    } catch (error) {
      console.error("데이터 제출 실패:", error)
      setFormError(`제출 중 오류가 발생했습니다: ${error instanceof Error ? error.message : "알 수 없는 오류"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 푸터로 스크롤 함수
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-section")
    if (contactSection) {
      const headerHeight = 72 // 헤더 높이 (px)
      const elementPosition = contactSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  // 배경 패턴 생성
  useEffect(() => {
    const pattern = document.getElementById("pattern")
    if (pattern) {
      for (let i = 0; i < 20; i++) {
        const item = document.createElement("div")
        item.className = "pattern-item"
        item.textContent = "+"
        item.style.top = `${Math.random() * 100}%`
        item.style.left = `${Math.random() * 100}%`
        item.style.fontSize = `${Math.random() * 20 + 10}px`
        item.style.opacity = `${Math.random() * 0.5 + 0.1}`
        item.style.transform = `rotate(${Math.random() * 360}deg)`
        pattern.appendChild(item)
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col break-keep-all">
      {/* 네비게이션 바 */}
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center border-b border-[#e6e8eb] bg-white z-50">
        <div className="container-custom flex justify-between items-center w-full">
          <div>
            <div className="h-8 flex items-center">
              <img src="/logo.svg" alt="amondlab 로고" className="h-8 w-auto" />
            </div>
          </div>
          <a
            href="https://service.mond.io.kr"
            className="bg-[#ff8000] hover:bg-[#f59931] text-white font-medium md:px-6 md:py-2 rounded-lg transition-colors border-none cursor-pointer inline-block"
          >
            서비스 사용하기
          </a>
        </div>
      </header>

      {/* 메인 히어로 섹션 */}
      <main className="px-8 pt-32 pb-16 md:pt-36 md:pb-20 relative bg-gradient-to-b from-white to-[#FAFAFA]">
        {/* 배경 패턴 */}
        <div id="pattern" className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none"></div>

        <div
          className={`container-custom transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-5xl mx-auto text-center">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] font-bold text-[#333333] mt-6 mb-8 break-keep-all w-full"
              style={{ lineHeight: "1.25" }}
            >
              터지는 SNS 콘텐츠,
              <br />
              아몬드랩 하나면 끝.
            </h2>
            <p className="text-base sm:text-lg text-[#252525] mb-10 break-keep-all leading-moderate">
              팔로워 증가, 매출 증진, 상품 홍보까지. SNS 성장을 위한 콘텐츠가 필요하신가요?
              <br />
              아이디어가 없어도, 시간이 없어도 괜찮아요. 아몬드랩이 작성을 도와드려요.
            </p>

            <div className="flex flex-col items-center">
              <a
                href="https://service.mond.io.kr"
                className="bg-[#ff8000] hover:bg-[#f59931] text-white font-medium px-6 py-2 sm:px-8 sm:py-3 rounded-lg text-base sm:text-lg transition-colors border-none cursor-pointer break-keep-all inline-block"
              >
                서비스 사용하기
              </a>

              {/* 말풍선 - 애니메이션 적용 */}
              <div className="mt-4">
                <AnimatedBubble />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 새로 추가된 기능 하이라이트 섹션 */}
      <FeatureHighlight />

      {/* 콘텐츠 캐러셀 섹션 */}
      <ContentCarousel />

      {/* 새로 추가된 교차 기능 섹션 */}
      <AlternatingFeatures />

      {/* 특징 박스 섹션 */}
      <FeatureBoxes />

      {/* 콘텐츠 탭 섹션 */}
      <ContentTabs />

      {/* 푸터 섹션 - 업데이트됨 */}
      <footer id="contact-section" className="py-16 bg-[#F3F3F3] text-center flex-grow break-keep-all">
        <div className="container-custom mx-auto" style={{ maxWidth: "550px" }}>
          <div className="mb-6">
            <div className="text-sm sm:text-base text-[#666666] mb-4">
              SNS 마케팅 트렌드 인사이트와 꿀팁을 전수할게요!
            </div>

            <div className="text-2xl sm:text-3xl leading-loose font-bold text-[#333333]">
              <div>
                아몬드랩, 지금 바로 시작해보세요.<br />
                마케팅 자동화 인사이트와 기능 업데이트를 가장 빠르게 받아보실 수 있어요.
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="text-left">
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm sm:text-base text-[#333333]">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="이메일 주소"
                required
                className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#ff8000]"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block mb-2 text-sm sm:text-base text-[#333333]">
                전화번호
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="010-0000-0000"
                required
                className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#ff8000]"
                onChange={handlePhoneChange}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="purpose" className="block mb-2 text-sm sm:text-base text-[#333333]">
                사용 목적
              </label>
              <select
                id="purpose"
                name="purpose"
                required
                defaultValue=""
                className="w-full px-4 py-3 border border-[#e0e0e0] rounded-lg focus:outline-none focus:border-[#ff8000] bg-white"
              >
                <option value="" disabled>
                  아몬드 사용 목적을 선택해주세요
                </option>
                <option value="개인">1인 비즈니스/크리에이터</option>
                <option value="사내">사내 마케터, 기획자</option>
                <option value="에이전시">에이전시 마케터, 기획자</option>
                <option value="대표">회사 대표(B2B Saas 검토)</option>
                <option value="기타">그 외</option>
              </select>
            </div>

            {formError && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">{formError}</div>
            )}

            <div className="flex items-start mb-4">
              <input type="checkbox" id="privacy" name="privacy" required className="mt-1 mr-2" />
              <label htmlFor="privacy" className="text-sm text-[#333333] leading-moderate">
                개인정보 수집 이용에 동의합니다(필수)
              </label>
            </div>

            <div className="flex items-start mb-6">
              <input type="checkbox" id="marketing" name="marketing" className="mt-1 mr-2" />
              <label htmlFor="marketing" className="text-sm text-[#333333] leading-moderate">
                광고성 정보 수신에 동의합니다(선택)
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 sm:py-4 bg-[#f59931] text-white font-semibold rounded-lg hover:bg-[#ff8000] transition-colors border-none cursor-pointer text-sm sm:text-base break-keep-all disabled:opacity-70"
            >
              {isSubmitting ? "처리 중..." : "마케팅 팁 받기"}
            </button>
          </form>
        </div>

        <div className="mt-20 py-8 bg-[#e0e0e0]">
          <div className="container-custom text-center">
            <div className="mb-4">
              <p className="text-sm text-[#666666] font-medium leading-moderate">(주)몬드</p>
              <p className="text-sm text-[#666666] leading-moderate">대표 유윤지 | 사업자등록번호 816-81-03565</p>
              <p className="text-sm text-[#666666] leading-moderate">
                경기도 용인시 수지구 상현로 5, 상현프라자 402-772호 | jerry@mond.io.kr
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* 성공 모달 */}
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
