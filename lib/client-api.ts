import type { Article, NewsResponse } from "./api"

// Client-side API functions that call our server API routes
// These are safe to use in 'use client' components

export async function fetchTopHeadlines(
  category = "",
  country = "us",
  pageSize = 10,
  page?: string,
  forceRefresh = false
): Promise<NewsResponse> {
  const params = new URLSearchParams()
  if (category) params.set("category", category)
  if (country) params.set("country", country)
  if (pageSize) params.set("pageSize", pageSize.toString())
  if (page) params.set("page", page)
  if (forceRefresh) params.set("refresh", "true")

  const response = await fetch(`/api/news?${params.toString()}`, {
    cache: forceRefresh ? 'no-store' : 'default'
  })
  
  if (!response.ok) {
    console.error("Failed to fetch headlines:", response.statusText)
    return { status: "error", totalResults: 0, articles: [] }
  }

  return response.json()
}

export async function fetchSearchNews(
  query: string,
  pageSize = 10,
  page?: string,
  sortBy?: string
): Promise<NewsResponse> {
  if (!query.trim()) {
    return { status: "ok", totalResults: 0, articles: [] }
  }

  const params = new URLSearchParams({ q: query })
  if (pageSize) params.set("pageSize", pageSize.toString())
  if (page) params.set("page", page)
  if (sortBy) params.set("sortBy", sortBy)

  const response = await fetch(`/api/news/search?${params.toString()}`)
  
  if (!response.ok) {
    console.error("Failed to search news:", response.statusText)
    return { status: "error", totalResults: 0, articles: [] }
  }

  return response.json()
}

// Re-export types for convenience
export type { Article, NewsResponse } from "./api"
