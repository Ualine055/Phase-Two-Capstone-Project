// import { NextRequest, NextResponse } from 'next/server'

// // Mock database
// const posts = [
//   {
//     id: 1,
//     title: "Getting Started with Next.js 16: A Comprehensive Guide",
//     excerpt: "Learn how to build modern web applications with Next.js 16, featuring Turbopack, React Server Components, and more.",
//     content: "<h2>Introduction</h2><p>Next.js 16 brings exciting new features...</p>",
//     author: "Sarah Chen",
//     avatar: "/abstract-profile.png",
//     authorId: "user1",
//     date: new Date("2025-11-14T10:00:00"),
//     readTime: 8,
//     category: "Technology",
//     tags: ["nextjs", "react", "programming"],
//     likes: 1240,
//     comments: 48,
//     views: 12540,
//     status: "published",
//     image: "/nextjs-logo.png",
//     slug: "getting-started-nextjs-16"
//   },
// ]

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams
//   const search = searchParams.get('search')
//   const tag = searchParams.get('tag')
//   const page = parseInt(searchParams.get('page') || '1')
//   const limit = parseInt(searchParams.get('limit') || '10')

//   let filtered = posts

//   if (search) {
//     filtered = filtered.filter(p =>
//       p.title.toLowerCase().includes(search.toLowerCase()) ||
//       p.excerpt.toLowerCase().includes(search.toLowerCase())
//     )
//   }

//   if (tag) {
//     filtered = filtered.filter(p => p.tags.includes(tag))
//   }

//   const total = filtered.length
//   const start = (page - 1) * limit
//   const paginated = filtered.slice(start, start + limit)

//   return NextResponse.json({
//     posts: paginated,
//     pagination: { page, limit, total, pages: Math.ceil(total / limit) }
//   })
// }

// export async function POST(request: NextRequest) {
//   const body = await request.json()

//   const newPost = {
//     id: posts.length + 1,
//     ...body,
//     date: new Date(),
//     likes: 0,
//     comments: 0,
//     views: 0,
//   }

//   posts.push(newPost)
//   return NextResponse.json(newPost, { status: 201 })
// }


import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');

    // Get all published posts from Firebase
    let result = await db.getPosts(page, limit);

    // Filter by search if provided
    if (search) {
      result.posts = result.posts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by tag if provided
    if (tag) {
      result.posts = result.posts.filter(p =>
        Array.isArray(p.tags) && p.tags.includes(tag)
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('[v0] Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, title, excerpt, content, tags, status } = body;

    if (!userId || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, title, content' },
        { status: 400 }
      );
    }

    // Create post in Firebase
    const newPost = await db.createPost(
      userId,
      title,
      excerpt || '',
      content,
      Array.isArray(tags) ? tags : tags ? tags.split(',') : []
    );

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('[v0] Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
