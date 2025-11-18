'use client'

import { useState } from 'react'
import { Heart, Share2, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ReactionButtonProps {
  postId: string | number
  initialLikes: number
  onReact?: (type: 'like' | 'clap') => Promise<void>
}

export function ReactionButton({
  postId,
  initialLikes,
  onReact,
}: ReactionButtonProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(initialLikes)
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async () => {
    setIsLoading(true)
    try {
      if (onReact) {
        await onReact('like')
      }
      setIsLiked(!isLiked)
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border-t border-b border-border py-6 mb-12 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <button
          onClick={handleLike}
          disabled={isLoading}
          className={`flex items-center gap-2 font-semibold transition-colors ${
            isLiked ? 'text-accent' : 'text-foreground/70 hover:text-foreground'
          }`}
        >
          <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          {likesCount} Likes
        </button>
        <button className="flex items-center gap-2 text-foreground/70 hover:text-foreground font-semibold transition-colors">
          <Share2 size={20} />
          Share
        </button>
      </div>
      <button className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground/70 hover:text-foreground">
        <Bookmark size={20} />
      </button>
    </div>
  )
}
