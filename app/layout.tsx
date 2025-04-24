import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GridBackground } from "@/components/grid-background"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Briefing | Modern News",
  description: "Stay informed with the latest news in a clean, modern interface",
  icons: {
    icon: [
      { url: '/briefing-logo.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/briefing-logo.svg', type: 'image/svg+xml' }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-black text-white antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <GridBackground />
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 relative z-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
