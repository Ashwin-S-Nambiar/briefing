import { Suspense } from "react"
import { searchNews } from "@/lib/api"
import { NewsGrid } from "@/components/news-grid"
import { SkeletonGrid } from "@/components/skeleton-grid"

interface SearchPageProps {
  searchParams: {
    q: string
  }
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return {
    title: `Search: ${query} | Briefing`,
    description: `Search results for "${query}" on Briefing.`,
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  const data = await searchNews(query)

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 bg-clip-text text-transparent">
            Search Results
          </span>
        </h1>
        <p className="text-white/70 max-w-2xl">
          {data.totalResults > 0
            ? `Found ${data.totalResults} results for "${query}"`
            : `No results found for "${query}"`}
        </p>
      </section>

      <Suspense fallback={<SkeletonGrid />}>
        <NewsGrid articles={data.articles} />
      </Suspense>
    </div>
  )
}
