import { NextRequest, NextResponse } from 'next/server'
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId, action } = await request.json()
    const { id: postId } = await params

    if (!userId || !action) {
      return NextResponse.json({ error: 'Missing userId or action' }, { status: 400 })
    }

    const postRef = doc(db, 'posts', postId)
    const postDoc = await getDoc(postRef)

    let currentLikedBy = []
    let currentLikes = 0

    if (postDoc.exists()) {
      const currentData = postDoc.data()
      currentLikedBy = currentData.likedBy || []
      currentLikes = currentData.likes || 0
    } else {
      // Create post document if it doesn't exist (for mock posts)
      await setDoc(postRef, {
        id: postId,
        likedBy: [],
        likes: 0,
        title: 'Mock Post',
        createdAt: new Date()
      })
    }

    if (action === 'like' && !currentLikedBy.includes(userId)) {
      await updateDoc(postRef, {
        likedBy: arrayUnion(userId),
        likes: currentLikes + 1
      })
    } else if (action === 'unlike' && currentLikedBy.includes(userId)) {
      await updateDoc(postRef, {
        likedBy: arrayRemove(userId),
        likes: Math.max(0, currentLikes - 1)
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating like:', error)
    return NextResponse.json({ error: 'Failed to update like' }, { status: 500 })
  }
}