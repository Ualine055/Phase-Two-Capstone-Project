'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface FollowButtonProps {
  userId: string
  authorName: string
  initialFollowing?: boolean
  onFollow?: (following: boolean) => Promise<void>
}

export function FollowButton({
  userId,
  authorName,
  initialFollowing = false,
  onFollow,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing)
  const [isLoading, setIsLoading] = useState(false)

  const handleFollow = async () => {
    setIsLoading(true)
    try {
      if (onFollow) {
        await onFollow(!isFollowing)
      }
      setIsFollowing(!isFollowing)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleFollow}
      disabled={isLoading}
      variant={isFollowing ? 'outline' : 'default'}
      className="rounded-full"
    >
      {isLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
    </Button>
  )
}
