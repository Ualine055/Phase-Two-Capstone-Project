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
  console.log('[API] GET /api/posts called');
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');
    
    console.log('[API] Query params:', { page, limit, search, tag });

    // Get posts from Firebase (include drafts for dashboard)
    const includeDrafts = searchParams.get('includeDrafts') === 'true';
    console.log('[API] Calling db.getPosts with includeDrafts:', includeDrafts);
    let result = await db.getPosts(page, limit, includeDrafts);
    console.log('[API] Raw result from db.getPosts:', result);

    // Filter by search if provided
    if (search) {
      console.log('[API] Filtering by search:', search);
      result.posts = result.posts.filter((p: any) =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by tag if provided
    if (tag) {
      console.log('[API] Filtering by tag:', tag);
      result.posts = result.posts.filter((p: any) =>
        Array.isArray(p.tags) && p.tags.includes(tag)
      );
    }

    console.log('[API] Final result:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API] Error fetching posts:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to fetch posts: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  console.log('[API] POST /api/posts called');
  try {
    const body = await request.json();
    console.log('[API] Request body:', body);
    const { userId, author, authorId, title, excerpt, content, tags, imageUrl, status } = body;

    if (!userId || !title || !content) {
      console.log('[API] Missing required fields:', { userId: !!userId, title: !!title, content: !!content });
      return NextResponse.json(
        { error: 'Missing required fields: userId, title, content' },
        { status: 400 }
      );
    }

    console.log('[API] Checking user exists:', userId);
    // Skip user verification for now since we're using mock users
    // const user = await db.getUserById(userId);
    // if (!user) {
    //   console.log('[API] User not found:', userId);
    //   return NextResponse.json(
    //     { error: 'User not found or unauthorized' },
    //     { status: 401 }
    //   );
    // }
    console.log('[API] User verification skipped (mock user)');

    console.log('[API] Creating post in Firebase...');
    // Create post in Firebase
    const newPost = await db.createPost(
      userId,
      title,
      excerpt || '',
      content,
      Array.isArray(tags) ? tags : tags ? tags.split(',') : [],
      imageUrl || '',
      author,
      authorId
    );
    console.log('[API] Post created:', newPost);

    // Update status if provided and different from default 'draft'
    if (status && status !== 'draft') {
      console.log('[API] Updating post status to:', status);
      const updatedPost = await db.updatePost(newPost.id, title, excerpt || '', content, status);
      console.log('[API] Post updated:', updatedPost);
      return NextResponse.json(updatedPost, { status: 201 });
    }

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('[API] Error creating post:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to create post: ${errorMessage}` },
      { status: 500 }
    );
  }
}
