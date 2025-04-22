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

      // Draw grid
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

      // Draw dots at intersections
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)"

      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    setupCanvas()
    draw()

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full pointer-events-none" aria-hidden="true" />
}
