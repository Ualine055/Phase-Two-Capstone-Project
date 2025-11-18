'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Comment } from '@/lib/types'

interface CommentSectionProps {
  postId: string | number
  comments: Comment[]
  onAddComment: (content: string) => Promise<void>
  onDeleteComment: (id: string | number) => Promise<void>
}

export function CommentSection({
  postId,
  comments,
  onAddComment,
  onDeleteComment,
}: CommentSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [likedComments, setLikedComments] = useState<Set<string | number>>(new Set())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await onAddComment(content)
      setContent('')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCommentLike = (commentId: string | number) => {
    setLikedComments(prev => {
      const newSet = new Set(prev)
      if (newSet.has(commentId)) {
        newSet.delete(commentId)
      } else {
        newSet.add(commentId)
      }
      return newSet
    })
  }

  return (
    <section className="border-t border-border py-6 mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">Comments ({comments.length})</h2>

      <div className="mb-8 p-4 rounded-lg bg-muted/30 border border-border">
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full bg-transparent text-foreground placeholder-foreground/50 focus:outline-none resize-none h-24"
          />
          <div className="flex justify-end mt-3">
            <Button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="px-6 py-2 rounded-full"
            >
              {isSubmitting ? 'Posting...' : 'Comment'}
            </Button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-t border-border pt-6">
            <div className="flex gap-4">
              <img
                src={comment.avatar || '/placeholder.svg'}
                alt={comment.author}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-foreground">{comment.author}</p>
                    <p className="text-xs text-foreground/60">
                      {comment.createdAt
                        ? new Date(comment.createdAt).toLocaleDateString()
                        : 'Just now'}
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteComment(comment.id)}
                    className="p-1 rounded hover:bg-muted text-foreground/60 hover:text-foreground"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-foreground/80 mb-3">{comment.content}</p>
                <div className="flex items-center gap-4 text-sm">
                  <button
                    onClick={() => handleCommentLike(comment.id)}
                    className={`font-semibold transition-colors ${
                      likedComments.has(comment.id)
                        ? 'text-accent'
                        : 'text-foreground/60 hover:text-foreground'
                    }`}
                  >
                    <Heart
                      size={16}
                      className="inline mr-1"
                      fill={likedComments.has(comment.id) ? 'currentColor' : 'none'}
                    />
                    {comment.likes}
                  </button>
                  <button className="text-primary hover:underline font-semibold">
                    Reply ({comment.replies})
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
