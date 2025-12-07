import { Suspense } from "react"
import { searchNews, type NewsResponse } from "@/lib/api"
import { NewsGrid } from "@/components/news-grid"
import { SkeletonGrid } from "@/components/skeleton-grid"
import { SearchInput } from "@/components/search-input"

interface SearchPageProps {
  searchParams: {
    q: string
  }
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return {
    title: query ? `Search: ${query} | Briefing News` : "Search | Briefing News",
    description: `Search results for "${query}" on Briefing News.`,
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  
  let data: NewsResponse = { status: "ok", articles: [], totalResults: 0 }
  
  if (query) {
    try {
      data = await searchNews(query)
    } catch (error) {
      console.error("Search error:", error)
    }
  }

  return (
    <div className="space-y-12 min-h-[60vh]">
      <section className="space-y-8 text-center pt-8">
        <h1 className="font-heading text-4xl md:text-5xl font-black text-black">
          Search the Archives
        </h1>
        
        <Suspense fallback={<div className="h-14 bg-black/5 rounded-full w-full max-w-2xl mx-auto animate-pulse" />}>
          <SearchInput />
        </Suspense>
        
        {query && (
          <p className="text-muted-foreground">
            {data.totalResults > 0
              ? `Found ${data.totalResults} results for "${query}"`
              : `No results found for "${query}"`}
          </p>
        )}
      </section>

      {query ? (
        <Suspense fallback={<SkeletonGrid />}>
          <NewsGrid articles={data.articles} />
        </Suspense>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 opacity-40">
           <div className="w-24 h-24 rounded-full bg-black/5 flex items-center justify-center mb-4">
             <svg className="w-10 h-10 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-lg font-medium text-black/50">Enter a keyword to start searching</p>
        </div>
      )}
    </div>
  )
}