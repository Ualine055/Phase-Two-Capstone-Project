"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Heart, MessageCircle } from 'lucide-react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ExplorePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTag, setSelectedTag] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const postsPerPage = 9

  const posts = [
    {
      id: 1,
      title: "The Future of Web Development",
      excerpt: "Exploring emerging technologies and trends that will shape web development in 2025 and beyond.",
      author: "Sarah Chen",
      avatar: "/abstract-profile.png",
      date: "2 hours ago",
      readTime: "8 min",
      category: "Technology",
      likes: 1240,
      comments: 48,
      image: "/web-development-concept.png",
    },
    {
      id: 2,
      title: "Minimalist Design Principles",
      excerpt: "Learn how to create beautiful, functional designs by embracing minimalism and reducing visual clutter.",
      author: "Marcus Rivera",
      avatar: "/abstract-user-profile.png",
      date: "4 hours ago",
      readTime: "6 min",
      category: "Design",
      likes: 892,
      comments: 32,
      image: "/abstract-design-elements.png",
    },
    {
      id: 3,
      title: "Remote Work Best Practices",
      excerpt:
        "Maximize productivity and maintain work-life balance while working from home with these proven strategies.",
      author: "Emma Johnson",
      avatar: "/abstract-geometric-profile.png",
      date: "6 hours ago",
      readTime: "10 min",
      category: "Business",
      likes: 2103,
      comments: 67,
      image: "/remote-work-setup.png",
    },
  ]

  const tags = ["All", "Technology", "Design", "Business", "Lifestyle", "Travel", "Health", "Food"]

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = selectedTag === "all" || p.category.toLowerCase() === selectedTag
    return matchesSearch && matchesTag
  })

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={true} />

      <div className="flex-1 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Explore Stories</h1>
            <p className="text-foreground/70 text-lg">Discover amazing stories from writers around the world</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-400 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag.toLowerCase())}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    selectedTag === tag.toLowerCase()
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground/70 hover:bg-muted/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <article className="group cursor-pointer h-full flex flex-col bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden h-40 bg-muted">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-primary bg-primary/20 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-foreground/60">{post.readTime} read</span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-foreground/70 text-sm mb-4 flex-1 line-clamp-2">{post.excerpt}</p>

                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <img src={post.avatar || "/placeholder.svg"} alt={post.author} className="w-8 h-8 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{post.author}</p>
                        <p className="text-xs text-foreground/60">{post.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border text-foreground/60 text-sm">
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
                </article>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            {currentPage < totalPages && (
              <button
                className="px-8 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Load More Stories
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
