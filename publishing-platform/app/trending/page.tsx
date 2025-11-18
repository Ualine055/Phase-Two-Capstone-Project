"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Heart, MessageCircle, TrendingUp } from 'lucide-react'
import { useState } from "react"

export default function TrendingPage() {
  const [timeRange, setTimeRange] = useState("week")

  const trendingPosts = [
    {
      id: 1,
      rank: 1,
      title: "The Future of Web Development",
      author: "Sarah Chen",
      avatar: "/abstract-profile.png",
      likes: 5240,
      comments: 312,
      views: 42500,
      trend: "+28%",
    },
    {
      id: 2,
      rank: 2,
      title: "Minimalist Design in 2025",
      author: "Marcus Rivera",
      avatar: "/abstract-user-profile.png",
      likes: 3892,
      comments: 156,
      views: 28300,
      trend: "+15%",
    },
    {
      id: 3,
      rank: 3,
      title: "Remote Work Best Practices",
      author: "Emma Johnson",
      avatar: "/abstract-geometric-profile.png",
      likes: 2103,
      comments: 89,
      views: 18900,
      trend: "+12%",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={true} />

      <div className="flex-1 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-primary" size={32} />
              <h1 className="text-4xl font-bold text-foreground">Trending Now</h1>
            </div>
            <p className="text-foreground/70 text-lg">Discover the most popular stories this {timeRange}</p>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-2 mb-8">
            {["day", "week", "month"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors capitalize ${
                  timeRange === range
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground/70 hover:bg-muted/80"
                }`}
              >
                This {range}
              </button>
            ))}
          </div>

          {/* Trending Posts */}
          <div className="space-y-4">
            {trendingPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <div className="p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                        #{post.rank}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      <div className="flex items-center gap-3 mb-4">
                        <img src={post.avatar || "/placeholder.svg"} alt={post.author} className="w-8 h-8 rounded-full" />
                        <p className="text-sm font-semibold text-foreground">{post.author}</p>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                        <span className="flex items-center gap-1">
                          <Heart size={16} />
                          {post.likes.toLocaleString()} likes
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={16} />
                          {post.comments} comments
                        </span>
                        <span>{post.views.toLocaleString()} views</span>
                        <span className="text-accent font-semibold">{post.trend}</span>
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
