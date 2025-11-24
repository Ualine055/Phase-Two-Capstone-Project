"use client"

import { useState } from "react"
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

  const handleSaveDraft = async () => {
    if (!user?.id || (!title.trim() && !content.trim())) {
      alert("Cannot save empty draft.")
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          author: user.username || user.email || 'Anonymous',
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
        alert("Draft saved successfully!")
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
      const requestBody = {
        userId: user.id,
        author: user.username || user.email || 'Anonymous',
        authorId: user.id,
        title,
        excerpt,
        content,
        tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        imageUrl,
        status: 'published'
      }
      
      console.log("Request body:", requestBody)
      
      const response = await fetch('/api/posts', {
        method: 'POST',
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
        alert("Story published successfully!")
        // Clear form after publishing
        setTitle("")
        setExcerpt("")
        setContent("")
        setTags("")
        setImageUrl("")
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
            <h1 className="text-2xl font-bold text-foreground">Write New Story</h1>
            <p className="text-foreground/70 text-sm mt-1">Draft • Last saved 2 minutes ago</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={loading}
            >
              <Save size={18} />
              <span className="hidden sm:inline">Save Draft</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
            >
              <Eye size={18} />
              <span className="hidden sm:inline">{isPreview ? "Edit" : "Preview"}</span>
            </Button>
            <Button
              onClick={handlePublish}
              disabled={loading}
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
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Or add custom image URL (e.g., https://example.com/image.jpg)"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {imageUrl && (
                <div className="mt-3">
                  <img
                    src={imageUrl}
                    alt="Cover preview"
                    className="w-full h-40 object-cover rounded-lg border border-border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
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
