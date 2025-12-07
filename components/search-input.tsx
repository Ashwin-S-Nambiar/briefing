"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")

  useEffect(() => {
    setQuery(searchParams.get("q") || "")
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
      <div className="relative flex items-center shadow-sm">
        <Input 
          type="text" 
          placeholder="Search for news, topics, or authors..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 h-14 rounded-full bg-white border-black/10 text-black placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-0 text-lg shadow-inner transition-all duration-300"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/40" />
        <Button 
          type="submit" 
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6 bg-brand-orange hover:bg-brand-orange/90 text-black font-semibold border-0"
        >
          Search
        </Button>
      </div>
    </form>
  )
}