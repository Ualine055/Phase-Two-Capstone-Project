'use client'

import { useState, useCallback } from 'react'
import type { Post } from '@/lib/types'

interface UseFetchPostsOptions {
  page?: number
  limit?: number
  search?: string
  tag?: string
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = useCallback(async (options: UseFetchPostsOptions = {}) => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (options.page) params.append('page', options.page.toString())
      if (options.limit) params.append('limit', options.limit.toString())
      if (options.search) params.append('search', options.search)
      if (options.tag) params.append('tag', options.tag)

      const response = await fetch(`/api/posts?${params}`)
      if (!response.ok) throw new Error('Failed to fetch posts')
      
      const data = await response.json()
      setPosts(data.posts)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createPost = useCallback(async (post: Omit<Post, 'id' | 'date' | 'likes' | 'comments' | 'views'>) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      })
      if (!response.ok) throw new Error('Failed to create post')
      const newPost = await response.json()
      setPosts([newPost, ...posts])
      return newPost
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [posts])

  const deletePost = useCallback(async (postId: string | number) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete post')
      setPosts(posts.filter(post => post.id !== postId))
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [posts])

  return { posts, isLoading, error, fetchPosts, createPost, deletePost }
}
