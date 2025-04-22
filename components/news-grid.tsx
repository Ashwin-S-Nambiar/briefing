import type { Article } from "@/lib/api"
import { NewsCard } from "@/components/news-card"

interface NewsGridProps {
  articles: Article[]
}

export function NewsGrid({ articles }: NewsGridProps) {
  if (!articles.length) {
    return (
      <div className="text-center py-12">
        <p className="text-white/70">No articles found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 news-grid">
      {articles.map((article, index) => (
        <NewsCard key={`${article.title}-${index}`} article={article} priority={index < 4} featured={index === 0} />
      ))}
    </div>
  )
}
