import { render, screen, fireEvent } from '@testing-library/react'
import { ReactionButton } from '../reaction-button'

describe('ReactionButton', () => {
  it('renders with initial likes count', () => {
    render(<ReactionButton postId="1" initialLikes={42} />)
    expect(screen.getByText(/42 Likes/)).toBeInTheDocument()
  })

  it('toggles like state when clicked', async () => {
    render(<ReactionButton postId="1" initialLikes={42} />)
    const likeButton = screen.getByRole('button', { name: /Likes/ })
    
    fireEvent.click(likeButton)
    expect(screen.getByText(/43 Likes/)).toBeInTheDocument()
    
    fireEvent.click(likeButton)
    expect(screen.getByText(/42 Likes/)).toBeInTheDocument()
  })

  it('calls onReact callback when provided', async () => {
    const onReact = jest.fn()
    render(<ReactionButton postId="1" initialLikes={42} onReact={onReact} />)
    
    const likeButton = screen.getByRole('button', { name: /Likes/ })
    fireEvent.click(likeButton)
    
    expect(onReact).toHaveBeenCalledWith('like')
  })
})
