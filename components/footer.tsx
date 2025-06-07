import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full glassmorphic py-6 relative z-10 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gradient mb-4">Briefing</h3>
            <p className="text-sm text-white/70">Stay informed with the latest news in a clean, modern interface.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/technology"
                  className="text-sm text-white/70 hover:text-gradient transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories/business" 
                  className="text-sm text-white/70 hover:text-gradient transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories/science" 
                  className="text-sm text-white/70 hover:text-gradient transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Science
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories/health" 
                  className="text-sm text-white/70 hover:text-gradient transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Health
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-sm text-white/70 hover:text-gradient transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm text-white/70 hover:text-gradient transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/careers" 
                  className="text-sm text-white/70 hover:text-gradient transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-sm text-white/70 hover:text-gradient transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-sm text-white/70 hover:text-gradient transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/70">© {new Date().getFullYear()} Briefing. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link 
              href="#" 
              className="glassmorphic-light px-3 py-1 rounded-full text-sm hover:animate-pulse-slow transition-all duration-300"
            >
              Twitter
            </Link>
            <Link 
              href="#" 
              className="glassmorphic-light px-3 py-1 rounded-full text-sm hover:animate-pulse-slow transition-all duration-300"
            >
              LinkedIn
            </Link>
            <Link 
              href="#" 
              className="glassmorphic-light px-3 py-1 rounded-full text-sm hover:animate-pulse-slow transition-all duration-300"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
