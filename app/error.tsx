"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-6 animate-pulse">
        Something went wrong
      </h1>
      <p className="text-white/70 max-w-md mb-8">
        We encountered an error while trying to process your request. Please try again later.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={reset} variant="default">
          Try again
        </Button>
        <Button asChild variant="outline" className="border-white/10">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
