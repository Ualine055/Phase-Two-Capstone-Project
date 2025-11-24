'use client'

import { useState, useEffect } from 'react'
import { Heart, Share2, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

interface ReactionButtonProps {
  postId: string | number
  initialLikes: number
  initialLikedBy?: string[]
  onReact?: (type: 'like' | 'clap') => Promise<void>
}

export function ReactionButton({
  postId,
  initialLikes,
  initialLikedBy = [],
  onReact,
}: ReactionButtonProps) {
  const { user } = useAuth()
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(initialLikes)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user?.id) {
      setIsLiked(initialLikedBy.includes(user.id))
    }
  }, [user?.id, initialLikedBy])

  const handleLike = async () => {
    if (!user?.id) {
      alert('Please login to like posts')
      return
    }

    console.log('Attempting to like post:', postId, 'User:', user.id, 'Current liked:', isLiked)
    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, action: isLiked ? 'unlike' : 'like' })
      })

      console.log('Like response status:', response.status)
      
      if (response.ok) {
        const newLiked = !isLiked
        const newCount = isLiked ? likesCount - 1 : likesCount + 1
        
        setIsLiked(newLiked)
        setLikesCount(newCount)
        
        console.log('Like updated successfully. New state:', newLiked, 'New count:', newCount)
      } else {
        const errorData = await response.json()
        console.error('Like failed:', errorData)
        alert('Failed to update like: ' + (errorData.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error updating like:', error)
      alert('Network error while updating like')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border-t border-b border-border py-6 mb-12 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          onClick={handleLike}
          disabled={isLoading}
          className={isLiked ? 'text-red-600' : ''}
        >
          <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          {likesCount} Likes
        </Button>
        <Button variant="ghost">
          <Share2 size={20} />
          Share
        </Button>
      </div>
      <Button variant="ghost" size="icon">
        <Bookmark size={20} />
      </Button>
    </div>
  )
}
