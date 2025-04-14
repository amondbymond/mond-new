import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "API 엔드포인트가 정상적으로 작동합니다.",
    method: "GET",
    timestamp: new Date().toISOString(),
  })
}
