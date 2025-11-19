import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    const body = await request.json();
    const { status } = body;
    
    console.log('[API] Updating post status:', postId, 'to', status);
    
    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }
    
    // Get the current post to preserve other fields (include drafts)
    const currentPost = await db.getPostById(postId, true);
    if (!currentPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Update the post status
    const updatedPost = await db.updatePost(
      postId,
      currentPost.title,
      currentPost.excerpt || '',
      currentPost.content,
      status
    );
    
    console.log('[API] Post status updated:', updatedPost);
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('[API] Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    const post = await db.getPostById(postId, true);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('[API] Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}