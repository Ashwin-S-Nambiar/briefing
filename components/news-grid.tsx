"use client"

import { motion } from "framer-motion"
import type { Article } from "@/lib/api"
import { NewsCard } from "@/components/news-card"

interface NewsGridProps {
  articles: Article[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
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
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {articles.map((article, index) => (
        <motion.div key={`${article.title}-${index}`} variants={item} className="h-full">
          <NewsCard article={article} />
        </motion.div>
      ))}
    </motion.div>
  )
}
