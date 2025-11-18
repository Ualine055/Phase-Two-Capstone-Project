import { NextRequest, NextResponse } from 'next/server'

// Define TypeScript interfaces
interface Post {
  id: number
  title: string
  excerpt: string
  author: string
  authorId: string
  avatar: string
  date: Date
  readTime: number
  category: string
  tags: string[]
  likes: number
  comments: number
  views: number
  status: 'draft' | 'published' | 'archived'
  image: string
  slug: string
}

interface FeedResponse {
  posts: Post[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Mock data - in a real app, this would come from a database
const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Getting Started with Next.js 16: A Comprehensive Guide',
    excerpt: 'Learn how to build modern web applications with Next.js 16, featuring Turbopack, React Server Components, and more.',
    author: 'Sarah Chen',
    authorId: 'user1',
    avatar: '/abstract-profile.png',
    date: new Date('2025-11-14T10:00:00'),
    readTime: 8,
    category: 'Technology',
    tags: ['nextjs', 'react', 'programming'],
    likes: 1240,
    comments: 48,
    views: 12540,
    status: 'published',
    image: '/nextjs-logo.png',
    slug: 'getting-started-nextjs-16',
  },
  {
    id: 2,
    title: 'Advanced TypeScript Patterns for React',
    excerpt: 'Explore advanced TypeScript patterns to make your React components more type-safe and maintainable.',
    author: 'Alex Johnson',
    authorId: 'user2',
    avatar: '/abstract-profile.png',
    date: new Date('2025-11-13T15:30:00'),
    readTime: 12,
    category: 'Technology',
    tags: ['typescript', 'react', 'frontend'],
    likes: 890,
    comments: 32,
    views: 9870,
    status: 'published',
    image: '/typescript-logo.png',
    slug: 'advanced-typescript-patterns-react',
  }
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get('userId') // Will be used for personalized feed
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)))

  try {
    // Filter published posts
    const publishedPosts = mockPosts.filter(post => post.status === 'published')
    
    // In a real app, you would filter by followed users here
    // const userFeed = userId 
    //   ? publishedPosts.filter(post => userFollows[userId]?.includes(post.authorId))
    //   : publishedPosts
    const userFeed = publishedPosts // For now, return all published posts

    // Calculate pagination
    const totalItems = userFeed.length
    const totalPages = Math.ceil(totalItems / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = userFeed.slice(startIndex, endIndex)

    const response: FeedResponse = {
      posts: paginatedPosts,
      pagination: {
        page,
        limit,
        total: totalItems,
        pages: totalPages,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching feed:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feed' },
      { status: 500 }
    )
  }
}
