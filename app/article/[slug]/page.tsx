import Image from "next/image"
import { notFound } from "next/navigation"
import { getTopHeadlines, searchNews, generateArticleSlug } from "@/lib/api"
import { ShareButton } from "@/components/share-button"
import { formatDistanceToNow, format } from "date-fns"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { article } = await getArticleFromSlug(params.slug)

  if (!article) {
    return {
      title: "Article Not Found | Briefing",
    }
  }

  return {
    title: `${article.title} | Briefing`,
    description: article.description || "Read the full article on Briefing.",
    openGraph: {
      images: [
        {
          url: article.urlToImage || "/placeholder.svg?height=630&width=1200",
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

async function getArticleFromSlug(slug: string) {
  try {
    // First try to find in top headlines
    const topHeadlines = await getTopHeadlines("", "us", 100)

    let article = topHeadlines.articles.find((article) => generateArticleSlug(article) === slug)

    // If not found, try to search more broadly
    if (!article) {
      // Extract potential keywords from the slug
      const keywords = slug
        .replace(/-\d+$/, "") // Remove timestamp part
        .split("-")
        .filter((word) => word.length > 3)
        .join(" ")

      if (keywords) {
        const searchResults = await searchNews(keywords, 100)
        article = searchResults.articles.find((article) => generateArticleSlug(article) === slug)
      }
    }

    return { article }
  } catch (error) {
    console.error("Error fetching article:", error)
    return { article: null }
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { article } = await getArticleFromSlug(params.slug)

  if (!article) {
    notFound()
  }

  const formattedDate = format(new Date(article.publishedAt), "MMMM d, yyyy")
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })

  return (
    <article className="max-w-4xl mx-auto animate-fade-in">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{article.title}</h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
          {article.source.name && <span className="bg-white/10 px-2 py-1 rounded-full">{article.source.name}</span>}
          <time dateTime={article.publishedAt} title={formattedDate}>
            {timeAgo}
          </time>
          {article.author && <span>By {article.author}</span>}
        </div>
      </div>

      {article.urlToImage && (
        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.urlToImage || "/placeholder.svg"}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      <div className="flex justify-end mb-8">
        <ShareButton title={article.title} url={typeof window !== "undefined" ? window.location.href : ""} />
      </div>

      <div className="prose prose-invert max-w-none">
        {article.description && <p className="text-xl font-medium text-white/90 mb-6">{article.description}</p>}

        {article.content ? (
          <div>
            {article.content
              .replace(/\[\+\d+ chars\]$/, "")
              .split("\n")
              .map((paragraph, index) => (
                <p key={index} className="mb-4 text-white/80">
                  {paragraph}
                </p>
              ))}
          </div>
        ) : (
          <p className="text-white/80">
            Continue reading the full article at{" "}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              {article.source.name || "the source"}
            </a>
            .
          </p>
        )}
      </div>

      <div className="mt-12 pt-8 border-t border-white/10">
        <p className="text-white/60 text-sm">
          This article was originally published on{" "}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            {article.source.name || "the source website"}
          </a>
          .
        </p>
      </div>
    </article>
  )
}
