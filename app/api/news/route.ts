import { NextRequest, NextResponse } from "next/server"
import { getTopHeadlines } from "@/lib/api"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category") || ""
  const country = searchParams.get("country") || "us"
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10)
  const page = searchParams.get("page") || undefined
  const refresh = searchParams.get("refresh") === "true"

  try {
    const data = await getTopHeadlines(category, country, pageSize, page, refresh)
    return NextResponse.json(data)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json(
      { status: "error", totalResults: 0, articles: [] },
      { status: 500 }
    )
  }
}
