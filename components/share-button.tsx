"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Copy, Twitter, Facebook, Linkedin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

interface ShareButtonProps {
  title: string
  url: string
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState(url)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href)
    }
  }, [])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      toast({
        title: "Link copied",
        description: "The article link has been copied to your clipboard.",
      })
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const handleShare = (platform: string) => {
    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="glass" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 glassmorphic text-white border-white/10">
        <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer">
          <Copy className="h-4 w-4" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("twitter")} className="gap-2 cursor-pointer">
          <Twitter className="h-4 w-4" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("facebook")} className="gap-2 cursor-pointer">
          <Facebook className="h-4 w-4" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("linkedin")} className="gap-2 cursor-pointer">
          <Linkedin className="h-4 w-4" />
          Share on LinkedIn
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
