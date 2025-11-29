"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Editor } from "@/components/editor"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { Save, Eye, Clock, Tag, Send } from "lucide-react"

export default function WritePage() {
  const { user } = useAuth()
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isPreview, setIsPreview] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingPostId, setEditingPostId] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Load post data if editing
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const editId = urlParams.get('edit')
    
    if (editId) {
      setEditingPostId(editId)
      setIsEditing(true)
      loadPostForEditing(editId)
    }
  }, [])

  const loadPostForEditing = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}`)
      if (response.ok) {
        const post = await response.json()
        setTitle(post.title || '')
        setExcerpt(post.excerpt || '')
        setContent(post.content || '')
        setTags(post.tags?.join(', ') || '')
        setImageUrl(post.imageUrl || '')
      } else {
        alert('Failed to load post for editing')
      }
    } catch (error) {
      console.error('Error loading post:', error)
      alert('Error loading post for editing')
    }
  }

  const handleSaveDraft = async () => {
    if (!user?.id || (!title.trim() && !content.trim())) {
      alert("Cannot save empty draft.")
      return
    }

    setLoading(true)
    try {
      const url = isEditing ? `/api/posts/${editingPostId}` : '/api/posts'
      const method = isEditing ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          author: user.username || user.email?.split('@')[0] || 'Anonymous',
          authorId: user.id,
          title,
          excerpt,
          content,
          tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
          imageUrl,
          status: 'draft'
        })
      })

      if (response.ok) {
        const post = await response.json()
        console.log("Draft saved with ID:", post.id)
        alert(isEditing ? "Draft updated successfully!" : "Draft saved successfully!")
        if (!isEditing) {
          setEditingPostId(post.id)
          setIsEditing(true)
        }
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save draft')
      }
    } catch (err) {
      console.error("Error saving draft:", err)
      alert("Failed to save draft.")
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async () => {
    if (!user?.id || !title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.")
      return
    }

    console.log("Publishing with user:", user)
    setLoading(true)
    try {
      const url = isEditing ? `/api/posts/${editingPostId}` : '/api/posts'
      const method = isEditing ? 'PUT' : 'POST'
      
      const requestBody = {
        userId: user.id,
        author: user.username || user.email?.split('@')[0] || 'Anonymous',
        authorId: user.id,
        title,
        excerpt,
        content,
        tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        imageUrl,
        status: 'published'
      }
      
      console.log("Request body:", requestBody)
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      console.log("Response status:", response.status)
      console.log("Response ok:", response.ok)

      if (response.ok) {
        const post = await response.json()
        console.log("Published with ID:", post.id)
        alert(isEditing ? "Story updated and published successfully!" : "Story published successfully!")
        
        if (!isEditing) {
          // Clear form after publishing new post
          setTitle("")
          setExcerpt("")
          setContent("")
          setTags("")
          setImageUrl("")
        }
      } else {
        const errorText = await response.text()
        console.error("API Error Response:", errorText)
        let errorMessage = 'Failed to publish story'
        try {
          const errorJson = JSON.parse(errorText)
          errorMessage = errorJson.error || errorMessage
        } catch (e) {
          errorMessage = errorText || errorMessage
        }
        alert(`Failed to publish story: ${errorMessage}`)
      }
    } catch (err) {
      console.error("Network/Parse Error:", err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      alert(`Failed to publish story: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header isAuthenticated={true} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isEditing ? 'Edit Story' : 'Write New Story'}
            </h1>
            <p className="text-foreground/70 text-sm mt-1">
              {isEditing ? 'Editing existing post' : 'Draft • Last saved 2 minutes ago'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={loading}
              className="bg-white text-indigo-800 border-2 border-indigo-800 hover:bg-gray-50"
            >
              <Save size={18} />
              <span className="hidden sm:inline">Save Draft</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
              className="bg-white text-indigo-800 border-2 border-indigo-800 hover:bg-gray-50"
            >
              <Eye size={18} />
              <span className="hidden sm:inline">{isPreview ? "Edit" : "Preview"}</span>
            </Button>
            <Button
              onClick={handlePublish}
              disabled={loading}
              className="bg-indigo-800 hover:bg-indigo-900 text-white"
            >
              <Send size={18} />
              Publish
            </Button>
          </div>
        </div>

        {isPreview ? (
          /* Preview Mode */
          <div className="prose">
            {title && <h1>{title}</h1>}
            {excerpt && <p className="text-lg text-foreground/70 italic">{excerpt}</p>}
            <div
              className="my-8 prose"
              dangerouslySetInnerHTML={{ __html: content || "<p>Your story will appear here...</p>" }}
            />
          </div>
        ) : (
          /* Editor Mode */
          <div className="space-y-6">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your story a catchy title..."
                className="w-full text-4xl font-bold text-foreground placeholder-foreground/30 bg-transparent focus:outline-none"
              />
            </div>

            <div>
              <input
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Add a subtitle or summary (optional)..."
                className="w-full text-xl text-foreground/70 placeholder-foreground/30 bg-transparent focus:outline-none"
              />
            </div>

            <Editor content={content} onChange={setContent} />

            <div className="space-y-3 p-4 rounded-lg bg-secondary/30 border border-border">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Tag size={16} />
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Add tags separated by commas (e.g., technology, design, tutorial)"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="space-y-3 p-4 rounded-lg bg-secondary/30 border border-border">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Eye size={16} />
                Cover Image
              </label>
              
              {/* Quick image selection */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  '/web-development-concept.png',
                  '/abstract-design-elements.png', 
                  '/abstract-geometric-shapes.png',
                  '/remote-work-setup.png'
                ].map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setImageUrl(img)}
                    className={`relative h-16 rounded-lg border-2 overflow-hidden transition-all ${
                      imageUrl === img ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img src={img} alt={`Option ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  let url = e.target.value.trim()
                  
                  // Auto-convert common image page URLs to direct URLs
                  if (url.includes('unsplash.com/photos/')) {
                    const photoId = url.split('/photos/')[1]?.split('-').pop()
                    if (photoId) {
                      url = `https://images.unsplash.com/photo-${photoId}?w=800&h=600&fit=crop`
                    }
                  } else if (url.includes('imgur.com/') && !url.includes('i.imgur.com')) {
                    // Convert imgur page to direct image
                    const imageId = url.split('/').pop()
                    url = `https://i.imgur.com/${imageId}.jpg`
                  } else if (url.includes('reddit.com/') && url.includes('/comments/')) {
                    // For Reddit posts, suggest using direct image links
                    console.warn('Reddit post URLs may not work. Try right-clicking the image and copying the image address.')
                  }
                  
                  setImageUrl(url)
                }}
                placeholder="Paste any image URL (direct links work best)"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-xs text-foreground/60 mt-1">
                💡 Tip: For best results, right-click on any image and select "Copy image address"
              </p>
              {imageUrl && (
                <div className="mt-3">
                  <img
                    src={imageUrl}
                    alt="Cover preview"
                    className="w-full h-40 object-cover rounded-lg border border-border"
                    onError={(e) => {
                      console.error('Image failed to load:', imageUrl)
                      e.currentTarget.style.display = 'none'
                      
                      // Create error message based on URL type
                      let errorMessage = 'Failed to load image.'
                      if (imageUrl.includes('instagram.com')) {
                        errorMessage = 'Instagram images cannot be hotlinked. Try uploading to imgur.com first.'
                      } else if (imageUrl.includes('facebook.com')) {
                        errorMessage = 'Facebook images cannot be hotlinked. Try uploading to imgur.com first.'
                      } else if (imageUrl.includes('pinterest.com')) {
                        errorMessage = 'Pinterest images may be blocked. Try copying the direct image URL.'
                      } else if (!imageUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                        errorMessage = 'URL may not be a direct image link. Try right-clicking the image and copying the image address.'
                      } else {
                        errorMessage = 'Image blocked by CORS policy or server restrictions.'
                      }
                      
                      const errorDiv = document.createElement('div')
                      errorDiv.className = 'w-full h-40 bg-red-50 border border-red-200 rounded-lg flex flex-col items-center justify-center text-red-600 text-sm p-4 text-center'
                      errorDiv.innerHTML = `<div class="font-medium mb-1">⚠️ ${errorMessage}</div><div class="text-xs text-red-500">Try: imgur.com, picsum.photos, or direct .jpg/.png URLs</div>`
                      e.currentTarget.parentNode?.appendChild(errorDiv)
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', imageUrl)
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-foreground/70 p-4 rounded-lg bg-muted/50">
              <Clock size={16} />
              <span>Estimated read time: 5 minutes</span>
            </div>
          </div>
        )}
        </div>
      </div>
    </AuthGuard>
  )
}
