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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 border-r border-white/10 bg-black/90 p-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${activePath === item.href ? 'text-purple-400' : 'text-white/80 hover:text-white'}`}
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
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 bg-clip-text text-transparent"
            >
              Briefing
            </Link>
          </div>
        </div>

        {/* Desktop Navigation (Pill Style) */}
        <nav className="hidden md:flex items-center space-x-1 bg-white/5 p-1 rounded-full">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActivePath(item.href)} 
              className={`relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full ${activePath === item.href ? 'text-white' : 'text-white/70 hover:text-white'}`}
            >
              {activePath === item.href && (
                <motion.div
                  layoutId="active-pill" 
                  className="absolute inset-0 bg-purple-600 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Search Icon */}
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <SearchIcon className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
