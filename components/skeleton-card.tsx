import { Card, CardContent } from "@/components/ui/card"

interface SkeletonCardProps {
  featured?: boolean
}

export function SkeletonCard({ featured = false }: SkeletonCardProps) {
  return (
    <Card className="h-full border border-black/5 bg-white shadow-sm rounded-2xl overflow-hidden">
      <div className="relative aspect-4/3 bg-black/5 animate-pulse" />

      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
           <div className="h-3 bg-black/5 rounded w-1/4 animate-pulse" />
           <div className="h-3 bg-black/5 rounded w-1/5 animate-pulse" />
        </div>
        
        <div className="h-6 bg-black/5 rounded w-full animate-pulse" />
        <div className="h-6 bg-black/5 rounded w-2/3 animate-pulse" />
        
        <div className="h-4 bg-black/5 rounded w-full animate-pulse mt-4" />
        <div className="h-4 bg-black/5 rounded w-5/6 animate-pulse" />

        <div className="pt-4">
          <div className="h-4 bg-black/5 rounded w-1/3 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}