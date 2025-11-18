'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorId: string;
  avatar: string;
  date: Date | string;
  readTime: number;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  status: 'draft' | 'published' | 'archived';
  image: string;
  slug: string;
}

interface FeedResponse {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function Feed() {
  const [feed, setFeed] = useState<FeedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/feed?page=${currentPage}&limit=${itemsPerPage}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch feed');
        }
        
        const data = await response.json();
        setFeed(data);
      } catch (err) {
        console.error('Error fetching feed:', err);
        setError('Failed to load feed. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [currentPage]);

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (loading && !feed) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!feed || feed.posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Articles</h1>
      
      <div className="space-y-8">
        {feed.posts.map((post) => (
          <article key={post.id} className="border-b border-gray-200 pb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <Link href={`/post/${post.slug}`} className="block aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>
              <div className="md:w-2/3">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{formatDate(post.date)}</span>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 transition-colors">
                  <Link href={`/post/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                      <Image 
                        src={post.avatar} 
                        alt={post.author}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="text-sm font-medium">{post.author}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                    <span>{post.views} views</span>
                  </div>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {feed.pagination.pages > 1 && (
        <div className="flex justify-center mt-12 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          
          {Array.from({ length: Math.min(5, feed.pagination.pages) }, (_, i) => {
            let pageNum;
            if (feed.pagination.pages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= feed.pagination.pages - 2) {
              pageNum = feed.pagination.pages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 rounded-full ${
                  currentPage === pageNum
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => setCurrentPage((prev) => Math.min(feed.pagination.pages, prev + 1))}
            disabled={currentPage === feed.pagination.pages}
            className={`px-4 py-2 rounded ${
              currentPage === feed.pagination.pages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
