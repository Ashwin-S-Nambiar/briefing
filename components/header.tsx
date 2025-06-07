'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon, SearchIcon } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Technology", href: "/categories/technology" },
  { name: "Business", href: "/categories/business" },
  { name: "Science", href: "/categories/science" },
  { name: "Health", href: "/categories/health" }, 
  { name: "Sports", href: "/categories/sports" },   
];

export function Header() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full glassmorphic">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white/90 hover:bg-white/10">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="glassmorphic w-64 border-r border-white/10 p-6">
              <nav className="flex flex-col space-y-6 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-all duration-300 ${
                      activePath === item.href 
                        ? 'text-gradient font-bold' 
                        : 'text-white/80 hover:text-white hover:translate-x-1'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-gradient animate-glow"
            >
              Briefing
            </Link>
          </div>
        </div>

        {/* Desktop Navigation (Pill Style) */}
        <nav className="hidden md:flex items-center space-x-1 glassmorphic-light p-1 rounded-full">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActivePath(item.href)} 
              className={`relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full ${
                activePath === item.href ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              {activePath === item.href && (
                <motion.div
                  layoutId="active-pill" 
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Search Icon */}
        <div className="flex items-center">
          <Link href="/search">
            <Button variant="ghost" size="icon" className="glassmorphic-light rounded-full w-10 h-10 hover:animate-pulse-slow">
              <SearchIcon className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
