"use client"

import { useState } from "react"
import { Bold, Italic, List, LinkIcon, ImageIcon, Code, Heading2, Quote as Quotes } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EditorProps {
  content: string
  onChange: (content: string) => void
}

export function Editor({ content, onChange }: EditorProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imageAlt, setImageAlt] = useState('')

  const insertMarkdown = (before: string, after = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end) || "text"
    const newContent = content.substring(0, start) + before + selectedText + after + content.substring(end)

    onChange(newContent)

    setTimeout(() => {
      textarea.selectionStart = start + before.length
      textarea.selectionEnd = start + before.length + selectedText.length
      textarea.focus()
    }, 0)
  }

  const insertImage = () => {
    if (!imageUrl.trim()) return
    
    const imageMarkdown = `![${imageAlt || 'Image'}](${imageUrl})`
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const newContent = content.substring(0, start) + imageMarkdown + content.substring(start)
    
    onChange(newContent)
    setShowImageDialog(false)
    setImageUrl('')
    setImageAlt('')
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length)
    }, 0)
  }

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div
        className={`flex flex-wrap gap-2 p-3 rounded-lg border transition-colors ${
          isFocused ? "border-primary bg-primary/5" : "border-border bg-muted/30"
        }`}
      >
        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("**", "**")} title="Bold">
          <Bold size={18} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("*", "*")} title="Italic">
          <Italic size={18} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("## ", "\n")} title="Heading">
          <Heading2 size={18} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("- ")} title="List">
          <List size={18} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("[", "](url)")} title="Link">
          <LinkIcon size={18} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("```\n", "\n```")} title="Code">
          <Code size={18} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertMarkdown("> ")} title="Quote">
          <Quotes size={18} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setShowImageDialog(true)} title="Insert Image" className="ml-auto">
          <ImageIcon size={18} />
        </Button>
      </div>

      {/* Text Area */}
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Write your story here... You can use Markdown formatting."
        className="w-full h-96 p-4 rounded-lg border border-border bg-background text-foreground placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none font-mono text-sm leading-relaxed"
      />

      <p className="text-xs text-foreground/50">
        Supports Markdown formatting: **bold**, *italic*, [links](url), code blocks, and more.
      </p>

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg border border-border w-full max-w-md">
            <h3 className="text-lg font-semibold text-foreground mb-4">Insert Image</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Alt Text (optional)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Describe the image"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              {imageUrl && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Preview</label>
                  <img
                    src={imageUrl}
                    alt={imageAlt || 'Preview'}
                    className="w-full h-32 object-cover rounded border border-border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowImageDialog(false)
                  setImageUrl('')
                  setImageAlt('')
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={insertImage}
                disabled={!imageUrl.trim()}
              >
                Insert Image
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
