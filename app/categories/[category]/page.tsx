import { Suspense } from "react"
import { getTopHeadlines } from "@/lib/api"
import { NewsGrid } from "@/components/news-grid"
import { SkeletonGrid } from "@/components/skeleton-grid"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    category: string
  }
}

const validCategories = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

export function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = params

  if (!validCategories.includes(category)) {
    return {
      title: "Category Not Found | Briefing",
    }
  }

  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  return {
    title: `${formattedCategory} News | Briefing`,
    description: `Latest ${formattedCategory} news and updates from around the world.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params

  if (!validCategories.includes(category)) {
    notFound()
  }

  const data = await getTopHeadlines(category)
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 bg-clip-text text-transparent">
            {formattedCategory} News
          </span>
        </h1>
        <p className="text-white/70 max-w-2xl">The latest {category} news and updates from around the world.</p>
      </section>

      <Suspense fallback={<SkeletonGrid />}>
        <NewsGrid articles={data.articles} />
      </Suspense>
    </div>
  )
}
