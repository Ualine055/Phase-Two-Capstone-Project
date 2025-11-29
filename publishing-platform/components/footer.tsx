"use client"

import Link from "next/link"
import { BookOpen, Twitter, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-indigo-800 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-800 flex items-center justify-center text-white">
                <BookOpen size={20} />
              </div>
              Publish
            </div>
            <p className="text-foreground/70 text-sm">A modern platform for writers to share stories with the world.</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="text-foreground/70 hover:text-foreground text-sm">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-foreground/70 hover:text-foreground text-sm">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/write" className="text-foreground/70 hover:text-foreground text-sm">
                  Start Writing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-foreground/70 hover:text-foreground text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-foreground/70 hover:text-foreground text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-foreground/70 hover:text-foreground text-sm">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-foreground/70 hover:text-foreground">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
            <p>&copy; 2025 Publish. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
