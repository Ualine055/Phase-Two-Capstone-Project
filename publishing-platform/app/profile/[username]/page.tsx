"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Heart, MessageCircle, Share2, UserPlus } from 'lucide-react'

export default function ProfilePage({ params }: { params: { username: string } }) {
  const user = {
    username: params.username,
    name: "Sarah Chen",
    bio: "Writer, developer, and coffee enthusiast. Sharing stories about tech, design, and life.",
    avatar: "/abstract-profile.png",
    followers: 2340,
    following: 180,
    totalPosts: 34,
    joinDate: "Joined February 2024",
    isFollowing: false,
  }

  const userPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js 16",
      excerpt: "Learn how to build modern web applications...",
      date: "2 hours ago",
      likes: 1240,
      readTime: "8 min",
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      excerpt: "Master advanced React patterns for scalable apps...",
      date: "1 week ago",
      likes: 856,
      readTime: "12 min",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={true} />

      <div className="flex-1 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-8 items-start mb-12 p-6 rounded-lg bg-card border border-border">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full"
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-1">{user.name}</h1>
              <p className="text-foreground/60 mb-3">@{user.username}</p>
              <p className="text-foreground/80 mb-4 max-w-2xl">{user.bio}</p>

              <div className="flex flex-wrap gap-6 mb-6">
                <div>
                  <p className="text-xl font-bold text-foreground">{user.totalPosts}</p>
                  <p className="text-sm text-foreground/60">Stories</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{user.followers.toLocaleString()}</p>
                  <p className="text-sm text-foreground/60">Followers</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{user.following}</p>
                  <p className="text-sm text-foreground/60">Following</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-6 py-2 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-colors">
                  <UserPlus size={18} />
                  Follow
                </button>
                <button className="px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors">
                  Message
                </button>
              </div>
            </div>
          </div>

          {/* Posts */}
          <h2 className="text-2xl font-bold text-foreground mb-6">Published Stories</h2>
          <div className="space-y-4">
            {userPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <div className="p-6 rounded-lg border border-border hover:border-primary transition-colors bg-card cursor-pointer">
                  <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-foreground/70 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-foreground/60">
                    <span>{post.date} • {post.readTime} read</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart size={16} />
                        {post.likes}
                      </span>
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
