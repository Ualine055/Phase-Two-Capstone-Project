// Firebase Implementation Example
// Use this version if you're using Firebase/Firestore

import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db-firebase';
import { ApiResponse, Post } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const result = await db.getPosts(page, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[v0] GET /api/posts-firebase error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, title, excerpt, content, tags } = body;

    if (!userId || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newPost = await db.createPost(userId, title, excerpt, content, tags || []);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('[v0] POST /api/posts-firebase error:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
