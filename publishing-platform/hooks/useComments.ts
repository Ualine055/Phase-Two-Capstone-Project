'use client'

import { useState, useCallback } from 'react'
import type { Comment } from '@/lib/types'

export function useComments(postId: string | number) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchComments = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/posts/${postId}/comments`)
      if (!response.ok) throw new Error('Failed to fetch comments')
      const data = await response.json()
      setComments(data.comments || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [postId])

  const addComment = useCallback(async (content: string, parentId?: string | number) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, parentId }),
      })
      if (!response.ok) throw new Error('Failed to add comment')
      const newComment = await response.json()
      setComments([...comments, newComment])
      return newComment
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return null
    }
  }, [comments, postId])

  const deleteComment = useCallback(async (commentId: string | number) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete comment')
      setComments(comments.filter(c => c.id !== commentId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }, [comments, postId])

  return { comments, isLoading, error, fetchComments, addComment, deleteComment }
}
