"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Article } from "@/lib/api"
import { formatDistanceToNow } from "date-fns"
import { PlayCircle, ArrowRight } from "lucide-react"

interface FeaturedSectionProps {
  articles: Article[]
}

export function FeaturedSection({ articles }: FeaturedSectionProps) {
  if (!articles || articles.length === 0) return null

  const mainArticle = articles[0]
  const sideArticles = articles.slice(1, 4)

  return (
    <section className="w-full mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Hero Article */}
        <div className="lg:col-span-8 relative group rounded-3xl overflow-hidden shadow-md">
          <Link href={mainArticle.url} target="_blank" rel="noopener noreferrer" className="block relative h-[500px] w-full">
            <Image
              src={mainArticle.urlToImage || "/placeholder.svg?height=800&width=1200"}
              alt={mainArticle.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute top-6 left-6">
               <span className="bg-white/90 backdrop-blur-md text-black px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                 Featured Post
               </span>
            </div>

            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full max-w-3xl">
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {mainArticle.title}
              </h2>
              <p className="text-white/80 text-lg line-clamp-2 md:line-clamp-3 max-w-2xl mb-6">
                {mainArticle.description}
              </p>
            </div>
          </Link>
        </div>

        {/* Side Articles List */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {sideArticles.map((article, index) => (
             <Link 
               key={index} 
               href={article.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="group flex gap-4 p-4 rounded-2xl bg-white border border-black/5 hover:shadow-lg hover:border-brand-orange/20 transition-all duration-300"
             >
               <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden">
                 <Image
                    src={article.urlToImage || "/placeholder.svg?height=200&width=200"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                 />
               </div>
               <div className="flex flex-col justify-between py-1">
                 <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                    <span>{formatDistanceToNow(new Date(article.publishedAt))} ago</span>
                 </div>
                 <h3 className="font-bold text-sm md:text-base leading-snug line-clamp-3 group-hover:text-brand-orange transition-colors">
                   {article.title}
                 </h3>
               </div>
             </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
