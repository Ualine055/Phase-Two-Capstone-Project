import { NextRequest, NextResponse } from 'next/server'

// Mock follows database
let follows: any[] = []

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const body = await request.json()
  const { currentUserId } = body

  // Check if already following
  const existingFollow = follows.find(
    f => f.followerId === currentUserId && f.followingId === id
  )

  if (existingFollow) {
    follows = follows.filter(f => f.id !== existingFollow.id)
    return NextResponse.json({ following: false })
  }

  const newFollow = {
    id: Date.now().toString(),
    followerId: currentUserId,
    followingId: id,
    createdAt: new Date(),
  }

  follows.push(newFollow)
  return NextResponse.json({ following: true })
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const followers = follows.filter(f => f.followingId === id)
  return NextResponse.json({ followers: followers.length })
}
