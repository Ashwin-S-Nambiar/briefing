"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { type Article, generateArticleSlug } from "@/lib/api"
import { formatDistanceToNow } from "date-fns"
import { ArrowUpRight } from "lucide-react"

interface NewsCardProps {
  article: Article
  featured?: boolean
}

export function NewsCard({ article, featured = false }: NewsCardProps) {
  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })

  return (
    <Link href={article.url} target="_blank" rel="noopener noreferrer" className="group h-full block">
      <Card className="h-full border border-black/5 bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={article.urlToImage || "/placeholder.svg?height=600&width=800"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {article.source.name && (
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-black shadow-sm tracking-wide">
              {article.source.name}
            </span>
          )}
        </div>

        <CardContent className="p-6 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider">
            <span>{formattedDate}</span>
             {/* Read time placeholder - API doesn't provide this usually */}
            <span>5 min read</span>
          </div>

          <h3 className="font-heading font-bold text-xl leading-tight text-black group-hover:text-brand-orange transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {article.description}
          </p>
          
          <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-black group-hover:text-brand-orange transition-colors">
            Read Article <ArrowUpRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
