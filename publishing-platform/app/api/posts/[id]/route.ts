// import { NextRequest, NextResponse } from 'next/server'

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = await Promise.resolve(params)

//   const post = {
//     id: parseInt(id),
//     title: "Getting Started with Next.js 16",
//     content: "<h2>Content here</h2>",
//     // Mock data
//   }

//   return NextResponse.json(post)
// }

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = await Promise.resolve(params)
//   const body = await request.json()

//   return NextResponse.json({
//     id: parseInt(id),
//     ...body,
//     updated: new Date()
//   })
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = await Promise.resolve(params)
//   return NextResponse.json({ deleted: true, id: parseInt(id) })
// }


import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get post from Firebase
    const post = await db.getPostById(id);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('[v0] Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, excerpt, content, status } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update post in Firebase
    const updatedPost = await db.updatePost(
      id,
      title,
      excerpt,
      content,
      status || 'draft'
    );

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('[v0] Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Delete post from Firebase
    await db.deletePost(id);

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error('[v0] Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
