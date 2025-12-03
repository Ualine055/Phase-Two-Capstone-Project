"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Search, Heart, MessageCircle, Loader2 } from 'lucide-react'

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [allPosts, setAllPosts] = useState<any[]>([])

  // Load all posts on component mount
  useEffect(() => {
    const loadAllPosts = async () => {
      try {
        // Mock posts
        const mockPosts = [
          {
            id: "mock-1",
            title: "Getting Started with Next.js 16: A Comprehensive Guide",
            excerpt: "Learn how to build modern web applications with Next.js 16, featuring Turbopack, React Server Components, and more.",
            author: "Sarah Chen",
            avatar: "/abstract-profile.png",
            date: "2 hours ago",
            readTime: "8 min",
            category: "Technology",
            likes: 1240,
            comments: 48,
          },
          {
            id: "mock-2",
            title: "The Art of Minimalist Design in 2025",
            excerpt: "Explore how minimalism is reshaping digital design, creating experiences that are both beautiful and functional.",
            author: "Marcus Rivera",
            avatar: "/abstract-user-profile.png",
            date: "4 hours ago",
            readTime: "6 min",
            category: "Design",
            likes: 892,
            comments: 32,
          },
          {
            id: "mock-3",
            title: "TypeScript Best Practices for Enterprise Applications",
            excerpt: "Master advanced TypeScript patterns and practices to write scalable, maintainable code in large-scale projects.",
            author: "Emma Johnson",
            avatar: "/abstract-geometric-profile.png",
            date: "6 hours ago",
            readTime: "10 min",
            category: "Programming",
            likes: 2103,
            comments: 67,
          },
        ]

        // Fetch real posts from Firebase
        const response = await fetch('/api/posts?limit=50')
        let userPosts = []
        if (response.ok) {
          const data = await response.json()
          userPosts = data.posts || []
        }

        setAllPosts([...mockPosts, ...userPosts])
      } catch (error) {
        console.error('Error loading posts:', error)
      }
    }

    loadAllPosts()

    // Get query from URL
    const urlParams = new URLSearchParams(window.location.search)
    const urlQuery = urlParams.get('q')
    if (urlQuery) {
      setQuery(urlQuery)
    }
  }, [])

  // Search functionality
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timer = setTimeout(() => {
      setIsLoading(true)
      
      const searchResults = allPosts.filter(post => {
        const matchesQuery = 
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(query.toLowerCase()) ||
          post.author?.toLowerCase().includes(query.toLowerCase()) ||
          post.category?.toLowerCase().includes(query.toLowerCase()) ||
          post.tags?.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()))
        
        const matchesFilter = selectedFilter === 'all' || 
          post.category?.toLowerCase() === selectedFilter.toLowerCase() ||
          post.tags?.some((tag: string) => tag.toLowerCase() === selectedFilter.toLowerCase())
        
        return matchesQuery && matchesFilter
      })
      
      setResults(searchResults)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, selectedFilter, allPosts])

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
              {["all", "Technology", "Design", "Programming", "Business"].map((filter) => (
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
