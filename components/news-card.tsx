import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { type Article, generateArticleSlug } from "@/lib/api"
import { formatDistanceToNow } from "date-fns"

interface NewsCardProps {
  article: Article
  priority?: boolean
  featured?: boolean
}

export function NewsCard({ article, priority = false, featured = false }: NewsCardProps) {
  const slug = generateArticleSlug(article)
  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })

  return (
    <Link href={article.url} target="_blank" rel="noopener noreferrer">
      <Card
        className={`glassmorphic-card overflow-hidden group transition-all duration-300 border-white/10 ${
          featured ? "md:col-span-2 md:row-span-2" : ""
        }`}
      >
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={article.urlToImage || "/placeholder.svg?height=400&width=600"}
            alt={article.title}
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {article.source.name && (
            <span className="absolute top-3 left-3 glassmorphic-light text-xs px-3 py-1 rounded-full font-medium">
              {article.source.name}
            </span>
          )}
          
          <div className="absolute bottom-3 right-3">
            <div className="glassmorphic-light w-2 h-2 rounded-full animate-pulse-slow"></div>
          </div>
        </div>

        <CardContent className="p-5">
          <div className="space-y-3">
            <h3
              className={`font-bold text-white line-clamp-2 group-hover:text-gradient transition-colors duration-300 ${
                featured ? "text-xl md:text-2xl" : "text-lg"
              }`}
            >
              {article.title}
            </h3>

            {article.description && (
              <p className="text-white/70 text-sm line-clamp-2">
                {article.description}
              </p>
            )}

            <div className="flex items-center justify-between text-xs text-white/60 pt-3">
              <span className="bg-white/5 px-2 py-1 rounded-md">{formattedDate}</span>
              <span className="inline-flex items-center glassmorphic-light px-3 py-1 rounded-full transition-all duration-300 group-hover:pr-4">
                Read more
                <svg
                  className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
