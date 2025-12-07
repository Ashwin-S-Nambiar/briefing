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
      title: "Article Not Found | Briefing News",
    }
  }

  return {
    title: `${article.title} | Briefing News`,
    description: article.description || "Read the full article on Briefing News.",
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
    const topHeadlines = await getTopHeadlines("", "us", 100)
    let article = topHeadlines.articles.find((article) => generateArticleSlug(article) === slug)

    if (!article) {
      const keywords = slug
        .replace(/-\d+$/, "") 
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
    <article className="max-w-4xl mx-auto animate-fade-in-up">
      <div className="space-y-6 mb-10 text-center">
         <div className="flex items-center justify-center gap-2 mb-4">
           {article.source.name && (
             <span className="bg-brand-orange/20 text-brand-dark px-3 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
               {article.source.name}
             </span>
           )}
           <time dateTime={article.publishedAt} title={formattedDate} className="text-sm text-muted-foreground font-medium">
             {formattedDate}
           </time>
         </div>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-black">
          {article.title}
        </h1>

        {article.author && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs">
                {article.author.charAt(0)}
             </div>
             <span className="font-medium">By {article.author}</span>
          </div>
        )}
      </div>

      {article.urlToImage && (
        <div className="relative aspect-video mb-12 rounded-3xl overflow-hidden shadow-xl border border-black/5">
          <Image
            src={article.urlToImage || "/placeholder.svg"}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-8 border-b border-black/10">
           <div className="text-sm font-bold text-black">
              Share this story
           </div>
           <ShareButton title={article.title} url={typeof window !== "undefined" ? window.location.href : ""} />
        </div>

        <div className="prose prose-lg prose-stone max-w-none">
          {article.description && (
            <p className="lead text-xl md:text-2xl font-medium text-black/90 mb-8 leading-relaxed">
              {article.description}
            </p>
          )}

          {article.content ? (
            <div className="text-black/80 space-y-6">
              {article.content
                .replace(/[+\d+ chars]$/, "")
                .split("\n")
                .map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
            </div>
          ) : (
             <div className="bg-brand-orange/10 p-8 rounded-2xl text-center">
                <p className="text-lg text-black/80 mb-4">
                  To read the full story, please visit the original source.
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-black bg-brand-orange hover:bg-brand-orange/90 transition-colors shadow-sm"
                >
                  Continue Reading on {article.source.name || "Source"}
                </a>
             </div>
          )}
        </div>
      </div>
    </article>
  )
}