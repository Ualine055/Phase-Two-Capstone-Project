"use client"

import Link from "next/link"
import { Search, Menu, X, BookOpen, PenTool } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  isAuthenticated: boolean
}

export function Header({ isAuthenticated }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-800 flex items-center justify-center text-white">
              <BookOpen size={20} />
            </div>
            <span className="hidden sm:inline text-indigo-800">Publish</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search stories..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-muted border border-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/explore" className="text-foreground/70 hover:text-foreground transition-colors">
              Explore
            </Link>
            <Link href="/trending" className="text-foreground/70 hover:text-foreground transition-colors">
              Trending
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-foreground/70 hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <Button asChild className="bg-indigo-800 hover:bg-indigo-900 text-white">
                  <Link href="/write">
                    <PenTool size={16} />
                    Write
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-foreground/70 hover:text-foreground transition-colors">
                  Sign In
                </Link>
                <Button asChild className="bg-indigo-800 hover:bg-indigo-800 text-white">
                  <Link href="/auth/signup">
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-muted border border-border"
                />
              </div>
              <Link href="/explore" className="px-4 py-2 text-foreground/70 hover:text-foreground">
                Explore
              </Link>
              <Link href="/trending" className="px-4 py-2 text-foreground/70 hover:text-foreground">
                Trending
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="px-4 py-2 text-foreground/70 hover:text-foreground">
                    Dashboard
                  </Link>
                  <Button asChild className="justify-start bg-indigo-800 hover:bg-indigo-900 text-white">
                    <Link href="/write">
                      <PenTool size={16} />
                      Write
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="px-4 py-2 text-foreground/70 hover:text-foreground">
                    Sign In
                  </Link>
                  <Button asChild className="justify-start bg-indigo-700 hover:bg-indigo-800">
                    <Link href="/auth/signup">
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
