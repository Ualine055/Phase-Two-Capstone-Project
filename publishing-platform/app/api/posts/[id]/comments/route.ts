// import { NextRequest, NextResponse } from 'next/server'

// // Mock comments database
// let comments = [
//   {
//     id: '1',
//     postId: 1,
//     authorId: 'user2',
//     author: 'Alex Martinez',
//     avatar: '/abstract-geometric-shapes.png',
//     content: 'Great guide! The Turbopack section was particularly helpful. Can\'t wait to upgrade my projects.',
//     likes: 42,
//     replies: 3,
//     likedBy: [],
//     parentId: undefined,
//     createdAt: new Date('2025-11-14T09:00:00'),
//   },
//   {
//     id: '2',
//     postId: 1,
//     authorId: 'user3',
//     author: 'Jordan Lee',
//     avatar: '/abstract-geometric-shapes.png',
//     content: 'Thanks for this comprehensive breakdown. One question about RSC - how do you handle state management across components?',
//     likes: 28,
//     replies: 1,
//     likedBy: [],
//     parentId: undefined,
//     createdAt: new Date('2025-11-14T08:45:00'),
//   },
// ]

// export async function GET(
//   request: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params
//   const filtered = comments.filter(c => c.postId.toString() === id)
//   return NextResponse.json({ comments: filtered })
// }

// export async function POST(
//   request: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params
//   const body = await request.json()

//   const newComment = {
//     id: (Math.max(...comments.map(c => parseInt(c.id as string) || 0)) + 1).toString(),
//     postId: parseInt(id),
//     authorId: 'current-user',
//     author: 'Current User',
//     avatar: '/placeholder-user.jpg',
//     content: body.content,
//     likes: 0,
//     replies: 0,
//     likedBy: [],
//     parentId: body.parentId,
//     createdAt: new Date(),
//   }

//   comments.push(newComment)
//   return NextResponse.json(newComment, { status: 201 })
// }


import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get comments from Firebase
    const comments = await db.getComments(id);

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('[v0] Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userId, content, parentCommentId } = body;

    if (!userId || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, content' },
        { status: 400 }
      );
    }

    // Create comment in Firebase
    const newComment = await db.createComment(id, userId, content, parentCommentId);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('[v0] Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
