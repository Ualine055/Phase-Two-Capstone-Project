import { Metadata } from 'next'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In a real app, fetch post data here
  const post = {
    title: 'Sample Post Title',
    excerpt: 'Sample post description for SEO',
    author: 'Author Name',
    image: '/web-development-concept.png'
  }

  return {
    title: `${post.title} | Publish`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}