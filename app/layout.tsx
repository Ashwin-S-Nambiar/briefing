import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Briefing | The Daily News",
  description: "Stay informed with the latest news in a classic, editorial interface",
  icons: {
    icon: [
      { url: '/briefing-logo.svg', type: 'image/svg+xml' }
    ],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} min-h-screen antialiased flex flex-col items-center py-4 md:py-8 px-4`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {/* Main Paper Container */}
          <div className="w-full max-w-[1400px] min-h-[calc(100vh-4rem)] paper-texture rounded-3xl flex flex-col overflow-hidden relative shadow-2xl transition-all duration-500">
            <Header />
            <main className="flex-1 w-full mx-auto px-4 md:px-8 py-6 relative z-10">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}