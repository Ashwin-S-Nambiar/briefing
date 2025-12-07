'use client';

import { useState, useEffect, useCallback } from "react";
import { fetchTopHeadlines, type Article } from "@/lib/client-api";
import { NewsGrid } from "@/components/news-grid";
import { SkeletonGrid } from "@/components/skeleton-grid";
import { FeaturedSection } from "@/components/featured-section";
import { ArrowDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = useCallback(async (forceRefresh = false) => {
    try {
      // Fetch general headlines for homepage via API route
      const data = await fetchTopHeadlines("general", "us", 10, undefined, forceRefresh); 
      setArticles(data.articles || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching news:", error);
      setArticles([]); 
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await fetchNews();
      setIsLoading(false);
    };
    init();
  }, [fetchNews]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchNews(true); // Force refresh to bypass cache
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-1">
         <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            {lastUpdated && <span>Updated: {format(lastUpdated, "h:mm a")}</span>}
         </div>
         <Button 
           variant="ghost" 
           size="sm" 
           onClick={handleRefresh} 
           disabled={isLoading || isRefreshing}
           className="gap-2 hover:bg-black/5 transition-colors"
         >
           <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
           Refresh News
         </Button>
      </div>

      {isLoading ? (
        <div className="space-y-8">
           <div className="w-full h-[500px] bg-black/5 animate-pulse rounded-3xl" />
           <SkeletonGrid />
        </div>
      ) : (
        <>
          <FeaturedSection articles={articles} />
          
          <div className="space-y-8 mt-12">
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
