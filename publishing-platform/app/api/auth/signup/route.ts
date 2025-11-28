import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    console.log('[Signup] Starting signup process...');
    const body = await request.json();
    console.log('[Signup] Request body:', { ...body, password: '[HIDDEN]' });
    
    const { username, email, password } = body;

    if (!username || !email || !password) {
      console.log('[Signup] Missing required fields:', { username: !!username, email: !!email, password: !!password });
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    console.log('[Signup] Checking if user exists...');
    // Check if user already exists
    const existingUser = await db.getUserByUsername(username);
    if (existingUser) {
      console.log('[Signup] User already exists:', username);
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      );
    }

    console.log('[Signup] Creating password hash...');
    // Simple password hash (in production, use bcrypt)
    const passwordHash = btoa(password); // Basic encoding

    console.log('[Signup] Creating user in database...');
    // Create user
    const newUser = await db.createUser(username, email, passwordHash);
    console.log('[Signup] User created successfully:', newUser.id);

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = newUser as any;
    
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('[Signup] Error details:', error);
    if (error instanceof Error) {
      console.error('[Signup] Error message:', error.message);
      console.error('[Signup] Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Failed to create account: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}