"use client"

import Link from "next/link"
import { Search, Menu, X, BookOpen } from "lucide-react"
import { useState } from "react"

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
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary text-indigo-800">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white bg-indigo-800">
              <BookOpen size={20} />
            </div>
            <span className="hidden sm:inline">Publish</span>
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
                <Link
                  href="/write"
                  className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-lg transition-shadow"
                >
                  Write
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-foreground/70 hover:text-foreground transition-colors">
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 rounded-full  font-semibold hover:shadow-lg transition-shadow text-white bg-indigo-800"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
                  <Link
                    href="/write"
                    className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold"
                  >
                    Write
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="px-4 py-2 text-foreground/70 hover:text-foreground">
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2 rounded-full bg-indigo-600 text-primary-foreground font-semibold"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
