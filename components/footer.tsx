import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/30 backdrop-blur-md py-6 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Briefing</h3>
            <p className="text-sm text-white/70">Stay informed with the latest news in a clean, modern interface.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/technology"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/categories/business" className="text-sm text-white/70 hover:text-white transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/categories/science" className="text-sm text-white/70 hover:text-white transition-colors">
                  Science
                </Link>
              </li>
              <li>
                <Link href="/categories/health" className="text-sm text-white/70 hover:text-white transition-colors">
                  Health
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-white/70 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-white/70 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/70">© {new Date().getFullYear()} Briefing. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
              Twitter
            </Link>
            <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
              LinkedIn
            </Link>
            <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
