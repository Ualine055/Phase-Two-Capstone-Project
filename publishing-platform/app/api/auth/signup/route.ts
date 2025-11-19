import { NextRequest, NextResponse } from 'next/server';
import * as db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.getUserByUsername(username);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      );
    }

    // Simple password hash (in production, use bcrypt)
    const passwordHash = btoa(password); // Basic encoding

    // Create user
    const newUser = await db.createUser(username, email, passwordHash);

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}