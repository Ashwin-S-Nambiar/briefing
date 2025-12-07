"use client"

import type { Article } from "@/lib/api"
import { NewsCard } from "@/components/news-card"

interface NewsGridProps {
  articles: Article[]
}

export function NewsGrid({ articles }: NewsGridProps) {
  if (!articles.length) {
    return (
      <div className="text-center py-12 rounded-xl bg-black/5 border border-dashed border-black/10">
        <p className="text-muted-foreground text-lg">No articles found at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <div key={`${article.title}-${index}`} className="h-full">
          <NewsCard article={article} />
        </div>
      ))}
    </div>
  )
}
