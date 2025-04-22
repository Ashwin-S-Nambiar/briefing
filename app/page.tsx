'use client';

import { useState, useEffect, startTransition } from "react";
import { getTopHeadlines, type Article } from "@/lib/api";
import { NewsGrid } from "@/components/news-grid";
import { SkeletonGrid } from "@/components/skeleton-grid";

const categories = [
  { key: "general", name: "Top Headlines" }, 
  { key: "business", name: "Business" },
  { key: "technology", name: "Technology" },
  { key: "entertainment", name: "Entertainment" },
  { key: "sports", name: "Sports" },
  { key: "health", name: "Health" },
  { key: "science", name: "Science" },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].key);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // Use the category key for the API call, handle 'general' case if needed by API
        const categoryParam = selectedCategory === 'general' ? '' : selectedCategory;
        const data = await getTopHeadlines(categoryParam, "in");
        setArticles(data.articles || []); // Ensure articles is always an array
      } catch (error) {
        console.error("Error fetching news:", error);
        setArticles([]); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory]); 

  const handleCategoryChange = (categoryKey: string) => {
    startTransition(() => {
       setSelectedCategory(categoryKey);
    });
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 bg-clip-text text-transparent">
            Latest News
          </span>
        </h1>
        <p className="text-white/70 max-w-2xl">
          Stay informed with the most recent updates from around the world, curated for a modern audience.
        </p>
      </section>

      <section>
        {isLoading ? (
          <SkeletonGrid />
        ) : (
          <NewsGrid articles={articles} />
        )}
      </section>
    </div>
  );
}
