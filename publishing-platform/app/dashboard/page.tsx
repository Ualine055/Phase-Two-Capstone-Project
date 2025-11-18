"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { BookOpen, Eye, Heart, MessageCircle, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    { label: "Total Views", value: "12,450", change: "+12%", icon: Eye },
    { label: "Total Likes", value: "3,240", change: "+8%", icon: Heart },
    { label: "Comments", value: "856", change: "+24%", icon: MessageCircle },
    { label: "Followers", value: "1,285", change: "+15%", icon: TrendingUp },
  ]

  const viewsData = [
    { name: "Mon", views: 240 },
    { name: "Tue", views: 320 },
    { name: "Wed", views: 280 },
    { name: "Thu", views: 450 },
    { name: "Fri", views: 620 },
    { name: "Sat", views: 480 },
    { name: "Sun", views: 350 },
  ]

  const recentPosts = [
    { id: 1, title: "Getting Started with React Hooks", views: 3420, likes: 420, status: "Published" },
    { id: 2, title: "Advanced TypeScript Patterns", views: 2840, likes: 380, status: "Published" },
    { id: 3, title: "Web Performance Optimization", views: 1240, likes: 185, status: "Draft" },
    { id: 4, title: "Design Systems 2025", views: 0, likes: 0, status: "Draft" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={true} />

      <div className="flex-1 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-foreground/70 mt-1">Welcome back! Here's your publishing stats.</p>
            </div>
            <Link
              href="/write"
              className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-lg transition-shadow"
            >
              New Story
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground/70 text-sm font-semibold">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                      <p className="text-accent text-sm mt-1">{stat.change} this month</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon size={24} className="text-primary" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-border">
            {["overview", "posts", "analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-semibold capitalize border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground/70 hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2 bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Views This Week</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={viewsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                      <YAxis stroke="var(--color-muted-foreground)" />
                      <Tooltip />
                      <Bar dataKey="views" fill="var(--color-primary)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Traffic Source */}
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Traffic Source</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground/70">Direct</span>
                        <span className="font-semibold">45%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground/70">Social</span>
                        <span className="font-semibold">35%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: "35%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground/70">Search</span>
                        <span className="font-semibold">20%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "posts" && (
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/30">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Views</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Likes</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPosts.map((post) => (
                      <tr key={post.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-foreground">{post.title}</td>
                        <td className="px-6 py-4 text-foreground/70">{post.views}</td>
                        <td className="px-6 py-4 text-foreground/70">{post.likes}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              post.status === "Published" ? "bg-primary/20 text-primary" : "bg-muted text-foreground/70"
                            }`}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-primary hover:underline text-sm font-semibold">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="bg-card p-6 rounded-lg border border-border text-center">
                <BookOpen size={48} className="mx-auto mb-4 text-foreground/50" />
                <p className="text-foreground/70">Detailed analytics coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
