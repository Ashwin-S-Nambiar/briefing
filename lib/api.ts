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
}

const API_KEY = process.env.NEWSAPI_KEY
const BASE_URL = "https://newsapi.org/v2"

// Update the getTopHeadlines function to handle API key issues better
export async function getTopHeadlines(category = "", country = "us", pageSize = 10, page = 1): Promise<NewsResponse> {
  try {
    // Check if API key exists
    if (!API_KEY) {
      console.error("NewsAPI key is missing. Please check your environment variables.")
      return getFallbackData()
    }

    const params = new URLSearchParams({
      country,
      pageSize: pageSize.toString(),
      page: page.toString(),
      apiKey: API_KEY,
    })

    if (category) {
      params.append("category", category)
    }

    const response = await fetch(`${BASE_URL}/top-headlines?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      console.error(`News API error: ${response.status} - ${response.statusText}`)
      return getFallbackData()
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching news:", error)
    return getFallbackData()
  }
}

// Update the searchNews function similarly
export async function searchNews(
  query: string,
  pageSize = 10,
  page = 1,
  sortBy: "relevancy" | "popularity" | "publishedAt" = "publishedAt",
): Promise<NewsResponse> {
  try {
    // Check if API key exists
    if (!API_KEY) {
      console.error("NewsAPI key is missing. Please check your environment variables.")
      return getFallbackData()
    }

    const params = new URLSearchParams({
      q: query,
      pageSize: pageSize.toString(),
      page: page.toString(),
      sortBy,
      apiKey: API_KEY,
    })

    const response = await fetch(`${BASE_URL}/everything?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      console.error(`News API error: ${response.status} - ${response.statusText}`)
      return getFallbackData()
    }

    return await response.json()
  } catch (error) {
    console.error("Error searching news:", error)
    return getFallbackData()
  }
}

// Add a function to provide fallback data when the API fails
function getFallbackData(): NewsResponse {
  return {
    status: "ok",
    totalResults: mockArticles.length,
    articles: mockArticles,
  }
}

// Add mock data for fallback
const mockArticles: Article[] = [
  {
    source: {
      id: "mock-source",
      name: "Tech Daily",
    },
    author: "Jane Smith",
    title: "The Future of AI in Everyday Applications",
    description: "How artificial intelligence is transforming our daily lives and what to expect in the coming years.",
    url: "https://example.com/ai-future",
    urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop",
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
    description: "Stock markets worldwide show volatility as major economies announce new fiscal policies.",
    url: "https://example.com/market-changes",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1740&auto=format&fit=crop",
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
    description: "Scientists announce promising results from clinical trials of a new therapeutic approach.",
    url: "https://example.com/medical-breakthrough",
    urlToImage: "https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=1898&auto=format&fit=crop",
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
    urlToImage: "https://images.unsplash.com/photo-1581093458791-9f3c3800eb5a?q=80&w=1740&auto=format&fit=crop",
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
    urlToImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1740&auto=format&fit=crop",
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
    description: "Nations agree to ambitious targets for reducing carbon emissions and protecting biodiversity.",
    url: "https://example.com/environmental-agreement",
    urlToImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1740&auto=format&fit=crop",
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
