"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, MessageCircle, Share2, BookOpen, Zap } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Mock data for featured posts
  const featuredPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js 16: A Comprehensive Guide",
      excerpt:
        "Learn how to build modern web applications with Next.js 16, featuring Turbopack, React Server Components, and more.",
      author: "Sarah Chen",
      avatar: "/abstract-profile.png",
      date: "2 hours ago",
      readTime: "8 min read",
      category: "Technology",
      likes: 1240,
      comments: 48,
      image: "/nextjs-logo.png",
    },
    {
      id: 2,
      title: "The Art of Minimalist Design in 2025",
      excerpt:
        "Explore how minimalism is reshaping digital design, creating experiences that are both beautiful and functional.",
      author: "Marcus Rivera",
      avatar: "/abstract-user-profile.png",
      date: "4 hours ago",
      readTime: "6 min read",
      category: "Design",
      likes: 892,
      comments: 32,
      image: "/abstract-design-elements.png",
    },
    {
      id: 3,
      title: "TypeScript Best Practices for Enterprise Applications",
      excerpt:
        "Master advanced TypeScript patterns and practices to write scalable, maintainable code in large-scale projects.",
      author: "Emma Johnson",
      avatar: "/abstract-geometric-profile.png",
      date: "6 hours ago",
      readTime: "10 min read",
      category: "Programming",
      likes: 2103,
      comments: 67,
      image: "/typescript-logo.png",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={isAuthenticated} />

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-br from-background via-secondary/20 to-background pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 ">
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
                Share Your <span className="text-indigo-800">Stories</span> with the World
              </h1>
              <p className="text-lg text-foreground/70 mb-8 text-balance">
                Write, publish, and connect with millions of readers. A modern platform for writers, creators, and
                thinkers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-indigo-800 text-white font-semibold hover:shadow-lg transition-shadow"
                >
                  Start Writing
                </Link>
                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-indigo-800 text-indigo-800 font-semibold hover:bg-indigo-800/5 transition-colors"
                >
                  Explore Stories
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
              <img
                src="/creative-writing-hero.jpg"
                alt="Publishing platform illustration"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-border">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-800 mb-2">2.5M+</div>
              <p className="text-foreground/70">Active Writers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-800 mb-2">50M+</div>
              <p className="text-foreground/70">Stories Published</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-800 mb-2">100M+</div>
              <p className="text-foreground/70">Monthly Readers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">Featured Stories</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <article className="group cursor-pointer h-full">
                  <div className="relative overflow-hidden rounded-xl mb-4 bg-muted h-40">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-accent-foreground">
                      {post.category}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <img src={post.avatar || "/placeholder.svg"} alt={post.author} className="w-8 h-8 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{post.author}</p>
                      <p className="text-xs text-foreground/50">{post.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border text-foreground/60 text-sm">
                    <span>{post.readTime}</span>
                    <div className="flex items-center gap-3">
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
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Powerful Features for Writers</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-indigo-800" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Rich Text Editor</h3>
              <p className="text-foreground/70">
                Write with full formatting support, embedded media, and real-time preview to perfect your story.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="text-indigo-800" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Easy Sharing</h3>
              <p className="text-foreground/70">
                Share your stories across social media platforms with auto-generated preview cards and tags.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-indigo-800" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Lightning Fast</h3>
              <p className="text-foreground/70">
                Optimized for performance with instant loading, SEO-friendly pages, and global CDN delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
