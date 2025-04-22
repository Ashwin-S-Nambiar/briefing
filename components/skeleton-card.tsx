import { Card, CardContent } from "@/components/ui/card"

interface SkeletonCardProps {
  featured?: boolean
}

export function SkeletonCard({ featured = false }: SkeletonCardProps) {
  return (
    <Card
      className={`overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className="relative aspect-video bg-white/10 animate-pulse" />

      <CardContent className="p-4 space-y-3">
        <div className={`h-6 ${featured ? "md:h-8" : ""} bg-white/10 rounded animate-pulse`} />
        <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-white/10 rounded animate-pulse w-1/2" />

        <div className="flex items-center justify-between pt-2">
          <div className="h-3 bg-white/10 rounded animate-pulse w-20" />
          <div className="h-3 bg-white/10 rounded animate-pulse w-16" />
        </div>
      </CardContent>
    </Card>
  )
}
