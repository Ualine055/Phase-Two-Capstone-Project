"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Editor } from "@/components/editor"
import { Save, Eye, Clock, Tag } from "lucide-react"

export default function WritePage() {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [isPreview, setIsPreview] = useState(false)

  const handleSaveDraft = () => {
    console.log("Saving draft...")
  }

  const handlePublish = () => {
    console.log("Publishing...")
  }

  return (
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
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <Save size={18} />
              <span className="hidden sm:inline">Save Draft</span>
            </button>
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <Eye size={18} />
              <span className="hidden sm:inline">{isPreview ? "Edit" : "Preview"}</span>
            </button>
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg transition-shadow"
            >
              Publish
            </button>
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

            <div className="flex items-center gap-2 text-sm text-foreground/70 p-4 rounded-lg bg-muted/50">
              <Clock size={16} />
              <span>Estimated read time: 5 minutes</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
