// Core TypeScript types for the publishing platform
export interface User {
  id: string
  email: string
  username: string
  avatar?: string
  bio?: string
  followers: number
  following: number
  createdAt: Date
}

export interface Tag {
  id: string
  name: string
  slug: string
  count: number
}

export interface Post {
  id: string | number
  title: string
  excerpt: string
  content: string
  author: string
  authorId: string
  avatar?: string
  date: Date
  readTime: number
  category: string
  tags: string[]
  likes: number
  comments: number
  views: number
  status: 'draft' | 'published'
  image?: string
  slug: string
  likedBy: string[]
  savedBy?: string[]
}

export interface Comment {
  id: string | number
  postId: string | number
  authorId: string
  author: string
  avatar?: string
  content: string
  likes: number
  replies: number
  likedBy?: string[]
  parentId?: string | number
  createdAt: Date
}

export interface Reaction {
  id: string
  userId: string
  postId: string | number
  type: 'like' | 'clap'
  createdAt: Date
}

export interface Follow {
  id: string
  followerId: string
  followingId: string
  createdAt: Date
}

export type ApiResponse<T> = {
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}
