import { NextRequest, NextResponse } from 'next/server';

// Mock comments storage
let mockComments: any[] = [];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    console.log('[API] Getting comments for post:', postId);
    
    // Filter comments for this post
    const comments = mockComments.filter(c => c.postId === postId);
    console.log('[API] Comments found:', comments.length);
    
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('[API] Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    const body = await request.json();
    const { content, parentId } = body;
    
    console.log('[API] Adding comment to post:', postId, { content, parentId });
    
    if (!content?.trim()) {
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      );
    }
    
    const newComment = {
      id: Date.now().toString(),
      postId,
      content,
      author: 'Anonymous User',
      avatar: '/abstract-profile.png',
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: 0,
      parentCommentId: parentId || null
    };
    
    mockComments.push(newComment);
    console.log('[API] Comment created:', newComment);
    
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('[API] Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}