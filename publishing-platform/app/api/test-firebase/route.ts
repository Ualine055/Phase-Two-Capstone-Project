import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export async function GET() {
  try {
    console.log('[TEST] Testing Firebase connection...')
    
    if (!db) {
      return NextResponse.json({ error: 'Firebase not initialized' }, { status: 500 })
    }
    
    const postsRef = collection(db, 'posts')
    const snapshot = await getDocs(postsRef)
    
    console.log('[TEST] Found', snapshot.size, 'posts in Firebase')
    
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return NextResponse.json({ 
      success: true, 
      count: posts.length,
      posts: posts.map(p => ({ id: p.id, title: p.title }))
    })
  } catch (error) {
    console.error('[TEST] Firebase error:', error)
    return NextResponse.json({ 
      error: 'Firebase connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}