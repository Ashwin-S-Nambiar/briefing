"use client"

import { useEffect, useRef } from "react"

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeObserver = new ResizeObserver(() => {
      setupCanvas()
      draw()
    })

    resizeObserver.observe(document.body)

    function setupCanvas() {
      if (!canvas || !ctx) return
      
      const devicePixelRatio = window.devicePixelRatio || 1
      const rect = document.body.getBoundingClientRect()

      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio

      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    function draw() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const rect = document.body.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      // Create gradient background
      const gradient = ctx.createRadialGradient(
        width * 0.3, height * 0.3, 0,
        width * 0.5, height * 0.5, width * 0.8
      )
      
      // Modern vibrant gradient colors
      gradient.addColorStop(0, "rgba(125, 39, 255, 0.4)")    // Purple
      gradient.addColorStop(0.4, "rgba(235, 87, 189, 0.3)")  // Pink
      gradient.addColorStop(0.7, "rgba(64, 139, 252, 0.2)")  // Blue
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")           // Transparent black
      
      // Fill background with gradient
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      
      // Draw secondary gradient for added dimension
      const secondGradient = ctx.createRadialGradient(
        width * 0.7, height * 0.7, 0,
        width * 0.6, height * 0.6, width * 0.6
      )
      
      secondGradient.addColorStop(0, "rgba(39, 128, 255, 0.3)")   // Light blue
      secondGradient.addColorStop(0.5, "rgba(87, 91, 225, 0.2)")  // Indigo
      secondGradient.addColorStop(1, "rgba(0, 0, 0, 0)")          // Transparent black
      
      ctx.fillStyle = secondGradient
      ctx.fillRect(0, 0, width, height)

      // Draw abstract blob shapes
      drawBlobShape(ctx, width * 0.2, height * 0.3, 150, "rgba(255, 87, 147, 0.1)") // Pink blob
      drawBlobShape(ctx, width * 0.7, height * 0.2, 200, "rgba(64, 76, 255, 0.1)")  // Blue blob
      drawBlobShape(ctx, width * 0.5, height * 0.8, 250, "rgba(125, 39, 255, 0.1)") // Purple blob

      // Draw subtle grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.lineWidth = 1

      const gridSize = 40

      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Draw subtle dots at intersections
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"

      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Function to draw organic blob shapes
    function drawBlobShape(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
      ctx.save()
      ctx.fillStyle = color
      ctx.beginPath()
      
      const points = 8
      const angleStep = (Math.PI * 2) / points
      
      for (let i = 0; i < points; i++) {
        const angle = i * angleStep
        const randomRadius = radius * (0.7 + Math.random() * 0.3)
        
        const pointX = x + Math.cos(angle) * randomRadius
        const pointY = y + Math.sin(angle) * randomRadius
        
        if (i === 0) {
          ctx.moveTo(pointX, pointY)
        } else {
          const prevAngle = (i - 1) * angleStep
          const prevPointX = x + Math.cos(prevAngle) * (radius * (0.7 + Math.random() * 0.3))
          const prevPointY = y + Math.sin(prevAngle) * (radius * (0.7 + Math.random() * 0.3))
          
          const cp1x = prevPointX + (pointX - prevPointX) * 0.5 + (Math.random() * 50 - 25)
          const cp1y = prevPointY + (pointY - prevPointY) * 0.5 + (Math.random() * 50 - 25)
          
          ctx.quadraticCurveTo(cp1x, cp1y, pointX, pointY)
        }
      }
      
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    setupCanvas()
    draw()
    
    // Add subtle animation
    let animationFrame: number
    const animate = () => {
      draw()
      animationFrame = requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full pointer-events-none" aria-hidden="true" />
}
