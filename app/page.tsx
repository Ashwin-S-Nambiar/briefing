'use client';

import { useState, useEffect } from "react";
import { getTopHeadlines, type Article } from "@/lib/api";
import { NewsGrid } from "@/components/news-grid";
import { SkeletonGrid } from "@/components/skeleton-grid";
import { FeaturedSection } from "@/components/featured-section";
import { ArrowDown } from "lucide-react";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // Fetch general headlines for homepage
        const data = await getTopHeadlines("general", "us"); 
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
        setArticles([]); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []); 

  return (
    <div className="space-y-12">
      {isLoading ? (
        <div className="space-y-8">
           <div className="w-full h-[500px] bg-black/5 animate-pulse rounded-3xl" />
           <SkeletonGrid />
        </div>
      ) : (
        <>
          <FeaturedSection articles={articles} />
          
          <div className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="font-heading text-4xl md:text-5xl font-black text-black">
                Weekly Top News
              </h2>
              <p className="text-muted-foreground max-w-2xl text-lg">
                Stay updated with our Weekly Top News, bringing you the latest trends, insights, and developments from around the world.
              </p>
              <ArrowDown className="w-6 h-6 text-brand-orange animate-bounce mt-4" />
            </div>

            <NewsGrid articles={articles.slice(4)} />
          </div>
        </>
      )}
    </div>
  );
}