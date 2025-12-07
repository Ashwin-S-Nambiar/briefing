import { NextRequest, NextResponse } from "next/server"
import { searchNews } from "@/lib/api"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q") || ""
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10)
  const page = searchParams.get("page") || undefined
  const sortBy = searchParams.get("sortBy") || undefined

  if (!query.trim()) {
    return NextResponse.json({ status: "ok", totalResults: 0, articles: [] })
  }

  try {
    const data = await searchNews(query, pageSize, page, sortBy)
    return NextResponse.json(data)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json(
      { status: "error", totalResults: 0, articles: [] },
      { status: 500 }
    )
  }
}
