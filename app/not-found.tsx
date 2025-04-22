import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 bg-clip-text text-transparent mb-6">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-white/70 max-w-md mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}
