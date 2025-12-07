"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeObserver = new ResizeObserver(() => {
      drawGrid()
    })

    resizeObserver.observe(document.body)

    function drawGrid() {
      if (!canvas || !ctx) return
      
      const devicePixelRatio = window.devicePixelRatio || 1
      const rect = document.body.getBoundingClientRect()

      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio

      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      ctx.scale(devicePixelRatio, devicePixelRatio)
      
      const width = rect.width
      const height = rect.height

      ctx.clearRect(0, 0, width, height)

      // Draw subtle grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
      ctx.lineWidth = 1

      const gridSize = 60

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
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)"

      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    drawGrid()

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      {/* Animated Gradient Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [-50, 50, -50],
          y: [-20, 20, -20]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/20 blur-[120px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [20, -20, 20],
          y: [50, -50, 50]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/20 blur-[130px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-pink-600/10 blur-[100px]"
      />

      {/* Grid Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
    </div>
  )
}