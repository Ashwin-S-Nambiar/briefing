import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full mt-16 pt-12 pb-8 border-t border-black/5 relative z-10 bg-linear-to-b from-transparent to-black/2">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
             <div className="flex items-center gap-2">
                <div className="bg-black text-white p-1 rounded-md">
                  <span className="font-heading font-black text-lg tracking-tighter">BN</span>
                </div>
                <span className="font-heading font-black text-xl tracking-tight text-black">Briefing News</span>
             </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Delivering accurate, timely, and engaging news from around the globe. Your daily dose of clarity in a chaotic world.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-black mb-6">Categories</h4>
            <ul className="space-y-3">
              {['Technology', 'Business', 'Science', 'Health'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/categories/${item.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-brand-orange transition-colors inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-6">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'Careers', 'Advertise'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-sm text-muted-foreground hover:text-brand-orange transition-colors inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-6">Subscribe</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest news directly in your inbox.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white border border-black/10 rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-brand-orange/50"
              />
              <button className="bg-black text-white rounded-full p-2 hover:bg-brand-orange hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Briefing News. All rights reserved.</p>
          <div className="flex gap-6">
            {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
               <Link key={social} href="#" className="text-sm font-medium text-black/60 hover:text-brand-orange transition-colors">
                 {social}
               </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}