'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon, SearchIcon } from "lucide-react";
import { cn } from '@/lib/utils';

const navItems = [
  { name: "Home", href: "/" },
  { name: "Sports", href: "/categories/sports" },
  { name: "Business", href: "/categories/business" },
  { name: "Politics", href: "/categories/politics" }, // Note: 'Politics' might not be a direct API category, usually 'General' covers it, but we'll leave link for now
  { name: "Tech & Media", href: "/categories/technology" },
  { name: "Science", href: "/categories/science" },
];

export function Header() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setActivePath(pathname);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 border-b border-black/5",
      scrolled ? "bg-[#fdfbf7]/90 backdrop-blur-md py-2 shadow-sm" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto flex items-center justify-between px-4 md:px-0">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="bg-black text-white p-1 rounded-md">
              <span className="font-heading font-black text-xl tracking-tighter">BN</span>
            </div>
            <span className="font-heading font-black text-2xl tracking-tight text-black">Briefing News</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActivePath(item.href)} 
              className={cn(
                "text-sm font-medium transition-colors nav-link",
                activePath === item.href ? "text-black" : "text-black/60 hover:text-black"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/search" className="text-black/60 hover:text-black transition-colors">
             <SearchIcon className="w-5 h-5" />
          </Link>
        </nav>

        {/* Action Button & Mobile Menu */}
        <div className="flex items-center gap-4">
           <Link href="/contact" className="hidden sm:block">
            <Button className="rounded-full bg-brand-orange hover:bg-brand-orange/90 text-black font-semibold px-6 shadow-sm hover:shadow-md transition-all">
              Contact Us
            </Button>
           </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-black hover:bg-black/5">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] paper-texture border-l border-black/10">
              <div className="flex flex-col gap-8 mt-8">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:translate-x-2 duration-300",
                        activePath === item.href ? "text-brand-orange font-bold" : "text-black/80"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link href="/search" className="flex items-center gap-2 text-lg font-medium text-black/80 hover:translate-x-2 duration-300">
                    <SearchIcon className="w-5 h-5" /> Search
                  </Link>
                </div>
                <div className="pt-8 border-t border-black/10">
                   <Button className="w-full rounded-full bg-brand-orange hover:bg-brand-orange/90 text-black font-semibold shadow-sm">
                    Contact Us
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
