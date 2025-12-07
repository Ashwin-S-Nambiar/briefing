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

const validCategories = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"]

export function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = params

  if (!validCategories.includes(category)) {
    return {
      title: "Category Not Found | Briefing News",
    }
  }

  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  return {
    title: `${formattedCategory} News | Briefing News`,
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
    <div className="space-y-12">
      <section className="text-center space-y-4 py-8 border-b border-black/5">
        <h1 className="font-heading text-5xl md:text-6xl font-black text-black tracking-tight">
          {formattedCategory}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          The latest stories and reports on {formattedCategory} from our editorial team.
        </p>
      </section>

      <Suspense fallback={<SkeletonGrid />}>
        <NewsGrid articles={data.articles} />
      </Suspense>
    </div>
  )
}