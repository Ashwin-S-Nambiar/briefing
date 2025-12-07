// Article interface
export interface Article {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

export interface NewsResponse {
  status: string
  totalResults: number
  articles: Article[]
  nextPage?: string | null
}

// NewsData.io raw response types
interface NewsDataArticle {
  article_id: string
  title: string
  link: string
  keywords: string[] | null
  creator: string[] | null
  video_url: string | null
  description: string | null
  content: string | null
  pubDate: string
  image_url: string | null
  source_id: string
  source_priority: number
  source_name: string
  source_url: string
  source_icon: string | null
  language: string
  country: string[]
  category: string[]
  ai_tag: string | null
  sentiment: string | null
  sentiment_stats: string | null
  ai_region: string | null
}

interface NewsDataResponse {
  status: string
  totalResults: number
  results: NewsDataArticle[]
  nextPage: string | null
}

// API Configuration
const API_KEY = process.env.NEWSDATA_API_KEY
const BASE_URL = process.env.NEWSDATA_URL

// Transform NewsData.io article to our Article interface
function transformArticle(newsDataArticle: NewsDataArticle): Article {
  return {
    source: {
      id: newsDataArticle.source_id || null,
      name: newsDataArticle.source_name || "Unknown Source",
    },
    author: newsDataArticle.creator?.length ? newsDataArticle.creator[0] : null,
    title: newsDataArticle.title || "Untitled",
    description: newsDataArticle.description,
    url: newsDataArticle.link || "#",
    urlToImage: newsDataArticle.image_url,
    publishedAt: newsDataArticle.pubDate || new Date().toISOString(),
    content: newsDataArticle.content,
  }
}

// Transform NewsData.io response to our NewsResponse interface
function transformResponse(newsDataResponse: NewsDataResponse): NewsResponse {
  return {
    status: newsDataResponse.status === "success" ? "ok" : newsDataResponse.status,
    totalResults: newsDataResponse.totalResults || 0,
    articles: (newsDataResponse.results || [])
      .filter((article) => article.title && article.title !== "[Removed]")
      .map(transformArticle),
    nextPage: newsDataResponse.nextPage,
  }
}

// NewsData.io category mapping (some categories differ from NewsAPI)
const categoryMap: Record<string, string> = {
  general: "top",
  business: "business",
  entertainment: "entertainment",
  health: "health",
  science: "science",
  sports: "sports",
  technology: "technology",
  politics: "politics",
}

// Fetch latest headlines from NewsData.io
export async function getTopHeadlines(
  category = "",
  country = "us",
  pageSize = 10,
  page?: string
): Promise<NewsResponse> {
  try {
    // Validate environment variables
    if (!API_KEY) {
      console.error("NewsData API error: NEWSDATA_API_KEY environment variable is not set")
      return getFallbackData()
    }
    if (!BASE_URL) {
      console.error("NewsData API error: NEWSDATA_URL environment variable is not set. Expected: https://newsdata.io/api/1")
      return getFallbackData()
    }

    const params = new URLSearchParams({
      apikey: API_KEY,
      country: country,
      language: "en",
    })

    // Map category to NewsData.io format
    if (category) {
      const mappedCategory = categoryMap[category.toLowerCase()] || category
      params.append("category", mappedCategory)
    }

    // NewsData.io uses cursor-based pagination with nextPage token
    if (page) {
      params.append("page", page)
    }

    const url = `${BASE_URL}/latest?${params.toString()}`
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      console.error(`NewsData API error: ${response.status} - ${response.statusText}. URL: ${BASE_URL}/latest`)
      return getFallbackData()
    }

    const data: NewsDataResponse = await response.json()

    if (data.status !== "success") {
      console.error("NewsData API returned non-success status:", data.status)
      return getFallbackData()
    }

    return transformResponse(data)
  } catch (error) {
    console.error("Error fetching news:", error)
    return getFallbackData()
  }
}

// Search news articles using NewsData.io
export async function searchNews(
  query: string,
  pageSize = 10,
  page?: string,
  sortBy?: string
): Promise<NewsResponse> {
  try {
    if (!query.trim()) {
      return { status: "ok", totalResults: 0, articles: [] }
    }

    // Validate environment variables
    if (!API_KEY) {
      console.error("NewsData API error: NEWSDATA_API_KEY environment variable is not set")
      return getFallbackData()
    }
    if (!BASE_URL) {
      console.error("NewsData API error: NEWSDATA_URL environment variable is not set. Expected: https://newsdata.io/api/1")
      return getFallbackData()
    }

    const params = new URLSearchParams({
      apikey: API_KEY,
      q: query,
      language: "en",
    })

    // NewsData.io uses cursor-based pagination
    if (page) {
      params.append("page", page)
    }

    const url = `${BASE_URL}/news?${params.toString()}`
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      console.error(`NewsData API error: ${response.status} - ${response.statusText}. URL: ${BASE_URL}/news`)
      return getFallbackData()
    }

    const data: NewsDataResponse = await response.json()

    if (data.status !== "success") {
      console.error("NewsData API returned non-success status:", data.status)
      return getFallbackData()
    }

    return transformResponse(data)
  } catch (error) {
    console.error("Error searching news:", error)
    return getFallbackData()
  }
}

// Fallback data when API fails
function getFallbackData(): NewsResponse {
  return {
    status: "ok",
    totalResults: mockArticles.length,
    articles: mockArticles,
  }
}

// Mock data for fallback
const mockArticles: Article[] = [
  {
    source: {
      id: "mock-source",
      name: "Tech Daily",
    },
    author: "Jane Smith",
    title: "The Future of AI in Everyday Applications",
    description:
      "How artificial intelligence is transforming our daily lives and what to expect in the coming years.",
    url: "https://example.com/ai-future",
    urlToImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop",
    publishedAt: new Date().toISOString(),
    content:
      "Artificial intelligence continues to evolve at a rapid pace, with new applications emerging across industries. From healthcare to finance, AI is transforming how we work and live. Recent advancements in machine learning algorithms have made it possible to process vast amounts of data more efficiently than ever before.",
  },
  {
    source: {
      id: "mock-source",
      name: "Business Insider",
    },
    author: "John Doe",
    title: "Global Markets React to Economic Policy Changes",
    description:
      "Stock markets worldwide show volatility as major economies announce new fiscal policies.",
    url: "https://example.com/market-changes",
    urlToImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1740&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    content:
      "Global markets experienced significant fluctuations today as several major economies announced changes to their fiscal policies. Investors are closely monitoring these developments as they could have far-reaching implications for international trade and economic growth in the coming quarters.",
  },
  {
    source: {
      id: "mock-source",
      name: "Health Today",
    },
    author: "Sarah Johnson",
    title: "Breakthrough in Medical Research Promises New Treatment Options",
    description:
      "Scientists announce promising results from clinical trials of a new therapeutic approach.",
    url: "https://example.com/medical-breakthrough",
    urlToImage:
      "https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=1898&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    content:
      "Researchers at the National Medical Institute have announced promising results from Phase II clinical trials of a novel therapeutic approach for treating chronic inflammatory conditions. The new treatment, which targets specific cellular pathways, has shown significant efficacy with minimal side effects in preliminary studies.",
  },
  {
    source: {
      id: "mock-source",
      name: "Science Weekly",
    },
    author: "Robert Chen",
    title: "Climate Scientists Develop More Accurate Prediction Models",
    description:
      "New computational methods allow for better forecasting of climate patterns and extreme weather events.",
    url: "https://example.com/climate-models",
    urlToImage:
      "https://images.unsplash.com/photo-1581093458791-9f3c3800eb5a?q=80&w=1740&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    content:
      "A team of international climate scientists has developed a new generation of prediction models that significantly improve the accuracy of long-term climate forecasts and extreme weather event predictions. These models incorporate advanced machine learning techniques with traditional climate science to process data from multiple sources.",
  },
  {
    source: {
      id: "mock-source",
      name: "Tech Innovations",
    },
    author: "Michael Wong",
    title: "Next Generation of Quantum Computing Reaches New Milestone",
    description:
      "Researchers achieve quantum supremacy in solving complex problems previously impossible for classical computers.",
    url: "https://example.com/quantum-computing",
    urlToImage:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1740&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    content:
      "Quantum computing researchers have announced a significant breakthrough in quantum processing capabilities, demonstrating the ability to solve complex optimization problems that would take classical supercomputers thousands of years to complete. This achievement marks a major milestone in the development of practical quantum computing applications.",
  },
  {
    source: {
      id: "mock-source",
      name: "World News",
    },
    author: "Elena Rodriguez",
    title: "International Cooperation Leads to Historic Environmental Agreement",
    description:
      "Nations agree to ambitious targets for reducing carbon emissions and protecting biodiversity.",
    url: "https://example.com/environmental-agreement",
    urlToImage:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1740&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    content:
      "In a landmark summit, representatives from 195 countries have reached a consensus on a comprehensive environmental protection framework that includes binding targets for carbon emission reductions and biodiversity conservation. The agreement, which will be implemented over the next decade, represents the most ambitious international environmental cooperation to date.",
  },
]

export function generateArticleSlug(article: Article): string {
  // Create a slug from the title
  const slug = article.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 100)

  // Add a timestamp to make it unique
  const timestamp = new Date(article.publishedAt).getTime()
  return `${slug}-${timestamp}`
}
