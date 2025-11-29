"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Trash2, Edit, ArrowLeft } from 'lucide-react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ReactionButton } from "@/components/reaction-button"
import { FollowButton } from "@/components/follow-button"
import { CommentSection } from "@/components/comment-section"
import { usePosts } from "@/hooks/usePosts"
import { useAuth } from "@/hooks/useAuth"
import { useComments } from "@/hooks/useComments"
import type { Comment } from "@/lib/types"

function PostComments({ postId }: { postId: string | number }) {
  const { comments, fetchComments, addComment, deleteComment } = useComments(postId)
  
  useEffect(() => {
    fetchComments()
  }, [fetchComments])
  
  return (
    <CommentSection
      postId={postId}
      comments={comments as Comment[]}
      onAddComment={addComment}
      onDeleteComment={deleteComment}
    />
  )
}

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { user } = useAuth()
  const { deletePost } = usePosts()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { id: postId } = use(params)
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Handle mock posts
        if (postId && postId.startsWith('mock-')) {
          const mockPosts = {
            'mock-1': {
              id: 'mock-1',
              title: "Getting Started with Next.js 16: A Comprehensive Guide",
              excerpt: "Learn how to build modern web applications with Next.js 16, featuring Turbopack, React Server Components, and more.",
              author: "Sarah Chen",
              authorId: "mock-user-1",
              avatar: "/abstract-profile.png",
              date: "2 hours ago",
              readTime: 8,
              category: "Technology",
              content: `<h2>Introduction</h2><p>Next.js 16 brings exciting new features to make building modern web applications even easier. In this comprehensive guide, we'll explore the key features and best practices for using Next.js 16.</p><h2>Key Features</h2><p>The latest version includes Turbopack as the default bundler, improved React Server Components, and enhanced performance optimizations.</p>`,
              likes: 1240,
              comments: 48,
              views: 12540,
              likedBy: []
            },
            'mock-2': {
              id: 'mock-2',
              title: "The Art of Minimalist Design in 2025",
              excerpt: "Explore how minimalism is reshaping digital design, creating experiences that are both beautiful and functional.",
              author: "Marcus Rivera",
              authorId: "mock-user-2",
              avatar: "/abstract-user-profile.png",
              date: "4 hours ago",
              readTime: 6,
              category: "Design",
              content: `<h2>The Power of Less</h2><p>Minimalist design is more than just a trend—it's a philosophy that prioritizes clarity, functionality, and user experience.</p>`,
              likes: 892,
              comments: 32,
              views: 8540,
              likedBy: []
            },
            'mock-3': {
              id: 'mock-3',
              title: "TypeScript Best Practices for Enterprise Applications",
              excerpt: "Master advanced TypeScript patterns and practices to write scalable, maintainable code in large-scale projects.",
              author: "Emma Johnson",
              authorId: "mock-user-3",
              avatar: "/abstract-geometric-profile.png",
              date: "6 hours ago",
              readTime: 10,
              category: "Programming",
              content: `<h2>Advanced TypeScript Patterns</h2><p>Learn how to leverage TypeScript's powerful type system to build robust enterprise applications.</p>`,
              likes: 2103,
              comments: 67,
              views: 15240,
              likedBy: []
            }
          }
          
          const mockPost = mockPosts[postId as keyof typeof mockPosts]
          if (mockPost) {
            setPost(mockPost)
          } else {
            setPost(null)
          }
        } else {
          // Handle real Firebase posts
          const response = await fetch(`/api/posts/${postId}`)
          if (response.ok) {
            const data = await response.json()
            setPost(data)
          } else {
            // Fallback to a default post if API fails
            setPost({
              id: postId,
              title: "Post Not Available",
              excerpt: "This post could not be loaded.",
              author: "Unknown Author",
              authorId: "unknown",
              avatar: "/abstract-profile.png",
              date: "Recently",
              readTime: 1,
              category: "General",
              content: "<p>This post is currently unavailable. Please try again later.</p>",
              likes: 0,
              comments: 0,
              views: 0,
              likedBy: []
            })
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPost()
  }, [postId])

  const [isFollowing, setIsFollowing] = useState(false)

  const handleDeletePost = async () => {
    if (confirm(`Are you sure you want to delete "${post.title}"? This action cannot be undone.`)) {
      const success = await deletePost(post.id)
      if (success) {
        alert('Post deleted successfully!')
        router.push('/dashboard')
      } else {
        alert('Failed to delete post')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header isAuthenticated={true} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header isAuthenticated={true} />
        <div className="flex-1 flex items-center justify-center">
          <p>Post not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={true} />

      <article className="flex-1 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Metadata */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
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
                <p className="font-semibold text-foreground">{post.author || 'Anonymous Author'}</p>
                <p className="text-sm text-foreground/60">
                  {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : post.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {user?.id === post.authorId ? (
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/write?edit=${post.id}`}>
                      Edit
                    </Link>
                  </Button>
                  <Button variant="destructive" onClick={handleDeletePost}>
                    Delete
                  </Button>
                </div>
              ) : (
                <FollowButton
                  userId={post.authorId}
                  authorName={post.author}
                  initialFollowing={isFollowing}
                  onFollow={async (following) => setIsFollowing(following)}
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="prose mb-12">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p>No content available</p>
            )}
          </div>

          {/* Engagement */}
          <ReactionButton
            postId={post.id}
            initialLikes={post.likes}
            initialLikedBy={post.likedBy || []}
          />

          {/* Comments */}
          {post && <PostComments postId={post.id} />}
        </div>
      </article>

      <Footer />
    </div>
  )
}
