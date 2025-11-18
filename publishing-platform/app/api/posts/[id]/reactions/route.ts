// import { NextRequest, NextResponse } from 'next/server'

// // Mock reactions database
// let reactions: any[] = []

// export async function POST(
//   request: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params
//   const body = await request.json()
//   const { userId, type } = body

//   // Check if user already reacted
//   const existingReaction = reactions.find(
//     r => r.postId.toString() === id && r.userId === userId && r.type === type
//   )

//   if (existingReaction) {
//     reactions = reactions.filter(r => r.id !== existingReaction.id)
//     return NextResponse.json({ liked: false })
//   }

//   const newReaction = {
//     id: Date.now().toString(),
//     postId: parseInt(id),
//     userId,
//     type,
//     createdAt: new Date(),
//   }

//   reactions.push(newReaction)
//   return NextResponse.json({ liked: true })
// }

// export async function GET(
//   request: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params
//   const postReactions = reactions.filter(r => r.postId.toString() === id)
//   return NextResponse.json({ reactions: postReactions, count: postReactions.length })
// }


import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get reactions from Firebase
    const reactions = await db.getPostReactions(id);

    return NextResponse.json(reactions);
  } catch (error) {
    console.error('[v0] Error fetching reactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reactions' },
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
    const { userId, reactionType } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required field: userId' },
        { status: 400 }
      );
    }

    // Add reaction in Firebase
    const result = await db.addReaction(id, userId, reactionType || 'like');

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('[v0] Error adding reaction:', error);
    return NextResponse.json(
      { error: 'Failed to add reaction' },
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
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required field: userId' },
        { status: 400 }
      );
    }

    // Remove reaction from Firebase
    await db.removeReaction(id, userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[v0] Error removing reaction:', error);
    return NextResponse.json(
      { error: 'Failed to remove reaction' },
      { status: 500 }
    );
  }
}
