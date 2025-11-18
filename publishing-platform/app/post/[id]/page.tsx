"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReactionButton } from "@/components/reaction-button"
import { FollowButton } from "@/components/follow-button"
import { CommentSection } from "@/components/comment-section"
import { useComments } from "@/hooks/useComments"
import type { Comment } from "@/lib/types"

export default function PostPage() {
  const [post] = useState({
    id: 1,
    title: "Getting Started with Next.js 16: A Comprehensive Guide",
    excerpt:
      "Learn how to build modern web applications with Next.js 16, featuring Turbopack, React Server Components, and more.",
    author: "Sarah Chen",
    authorId: "user1",
    avatar: "/abstract-profile.png",
    date: "2 hours ago",
    readTime: 8,
    category: "Technology",
    content: `
      <h2>Introduction</h2>
      <p>Next.js 16 brings exciting new features to make building modern web applications even easier. In this comprehensive guide, we'll explore the key features and best practices for using Next.js 16.</p>
      
      <h2>Key Features</h2>
      <p>The latest version includes Turbopack as the default bundler, improved React Server Components, and enhanced performance optimizations.</p>
      
      <h3>Turbopack</h3>
      <p>Turbopack is now the stable default bundler, providing significantly faster build times and better performance.</p>
      
      <h3>React Server Components</h3>
      <p>RSC support has been improved, making it easier to build components that run on the server.</p>
      
      <h2>Getting Started</h2>
      <p>To create a new Next.js 16 project, run the following command:</p>
      <pre><code>npx create-next-app@latest my-app</code></pre>
      
      <h2>Best Practices</h2>
      <p>Follow these best practices when working with Next.js 16:</p>
      <ul>
        <li>Use Server Components by default</li>
        <li>Optimize your images with the Image component</li>
        <li>Leverage dynamic imports for code splitting</li>
        <li>Use the new Cache API for efficient data fetching</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Next.js 16 provides a powerful foundation for building modern web applications. With features like Turbopack, improved RSC support, and performance optimizations, you'll be able to build faster, more reliable applications.</p>
    `,
    likes: 1240,
    comments: 48,
    views: 12540,
  })

  const { comments, fetchComments, addComment, deleteComment } = useComments(post.id)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={true} />

      <article className="flex-1 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Metadata */}
          <div className="mb-8">
            <Link href="/" className="text-primary hover:underline text-sm font-semibold mb-4 inline-block">
              ← Back to Home
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                {post.category}
              </span>
              <span className="text-foreground/60 text-sm">{post.readTime} min read</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-foreground mb-4 text-balance">{post.title}</h1>

          {/* Excerpt */}
          <p className="text-xl text-foreground/70 mb-8 text-balance">{post.excerpt}</p>

          {/* Author Info */}
          <div className="flex items-center justify-between py-6 border-t border-b border-border mb-8">
            <div className="flex items-center gap-4">
              <img src={post.avatar || "/placeholder.svg"} alt={post.author} className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-semibold text-foreground">{post.author}</p>
                <p className="text-sm text-foreground/60">{post.date}</p>
              </div>
            </div>
            <FollowButton
              userId={post.authorId}
              authorName={post.author}
              initialFollowing={isFollowing}
              onFollow={async (following) => setIsFollowing(following)}
            />
          </div>

          {/* Content */}
          <div className="prose mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Engagement */}
          <ReactionButton
            postId={post.id}
            initialLikes={post.likes}
            onReact={async (type) => {
              console.log(`[v0] Reaction: ${type}`)
            }}
          />

          {/* Comments */}
          <CommentSection
            postId={post.id}
            comments={comments as Comment[]}
            onAddComment={addComment}
            onDeleteComment={deleteComment}
          />
        </div>
      </article>

      <Footer />
    </div>
  )
}
