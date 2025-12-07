"use client"

import { useState } from "react"
import Image, { ImageProps } from "next/image"

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string
}

export function ImageWithFallback({ 
  src, 
  fallbackSrc = "/placeholder.svg?height=600&width=800", 
  alt, 
  ...props 
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt}
      onError={() => {
        setHasError(true)
        setImgSrc(fallbackSrc)
      }}
    />
  )
}
