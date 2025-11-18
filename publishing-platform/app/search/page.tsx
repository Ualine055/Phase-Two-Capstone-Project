"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Search, Heart, MessageCircle, Loader2 } from 'lucide-react'

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setResults([
          {
            id: 1,
            title: "Getting Started with Next.js 16",
            excerpt: "Learn how to build modern applications...",
            author: "Sarah Chen",
            avatar: "/abstract-profile.png",
            date: "2 hours ago",
            readTime: "8 min",
            likes: 1240,
            comments: 48,
          },
          {
            id: 2,
            title: "Advanced TypeScript Patterns",
            excerpt: "Master advanced TypeScript for enterprise apps...",
            author: "Emma Johnson",
            avatar: "/abstract-geometric-profile.png",
            date: "1 day ago",
            readTime: "12 min",
            likes: 856,
            comments: 32,
          },
        ])
        setIsLoading(false)
      }, 300)
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={true} />

      <div className="flex-1 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Search Stories</h1>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, author, or keyword..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-lg"
              />
              {isLoading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-foreground/50" size={20} />}
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              {["all", "Technology", "Design", "Business"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors capitalize ${
                    selectedFilter === filter
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground/70 hover:bg-muted/80"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {results.length === 0 && query && !isLoading && (
              <div className="text-center py-12">
                <p className="text-foreground/70">No stories found for "{query}". Try different keywords.</p>
              </div>
            )}

            {results.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <div className="p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex gap-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2 hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-foreground/70 mb-4">{post.excerpt}</p>

                      <div className="flex items-center gap-3 mb-4">
                        <img src={post.avatar || "/placeholder.svg"} alt={post.author} width={32} height={32} className="w-8 h-8 rounded-full" />
                        <p className="text-sm font-semibold text-foreground">{post.author}</p>
                        <span className="text-foreground/60">•</span>
                        <p className="text-sm text-foreground/60">{post.date}</p>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                        <span>{post.readTime} read</span>
                        <span className="flex items-center gap-1">
                          <Heart size={16} />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={16} />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
