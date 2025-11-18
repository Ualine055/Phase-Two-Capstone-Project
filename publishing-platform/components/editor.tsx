"use client"

import { useState } from "react"
import { Bold, Italic, List, LinkIcon, ImageIcon, Code, Heading2, Quote as Quotes } from "lucide-react"

interface EditorProps {
  content: string
  onChange: (content: string) => void
}

export function Editor({ content, onChange }: EditorProps) {
  const [isFocused, setIsFocused] = useState(false)

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

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div
        className={`flex flex-wrap gap-2 p-3 rounded-lg border transition-colors ${
          isFocused ? "border-primary bg-primary/5" : "border-border bg-muted/30"
        }`}
      >
        <button
          onClick={() => insertMarkdown("**", "**")}
          className="p-2 rounded hover:bg-muted text-foreground/70 hover:text-foreground transition-colors"
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => insertMarkdown("*", "*")}
          className="p-2 rounded hover:bg-muted text-foreground/70 hover:text-foreground transition-colors"
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => insertMarkdown("## ", "\n")}
          className="p-2 rounded hover:bg-muted text-foreground/70 hover:text-foreground transition-colors"
          title="Heading"
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={() => insertMarkdown("- ")}
          className="p-2 rounded hover:bg-muted text-foreground/70 hover:text-foreground transition-colors"
          title="List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => insertMarkdown("[", "](url)")}
          className="p-2 rounded hover:bg-muted text-foreground/70 hover:text-foreground transition-colors"
          title="Link"
        >
          <LinkIcon size={18} />
        </button>
        <button
          onClick={() => insertMarkdown("```\n", "\n```")}
          className="p-2 rounded hover:bg-muted text-foreground/70 hover:text-foreground transition-colors"
          title="Code"
        >
          <Code size={18} />
        </button>
        <button
          onClick={() => insertMarkdown("> ")}
          className="p-2 rounded hover:bg-muted text-foreground/70 hover:text-foreground transition-colors"
          title="Quote"
        >
          <Quotes size={18} />
        </button>
        <button
          onClick={() => insertMarkdown("![]()")}
          className="p-2 rounded hover:bg-muted text-foreground/70 hover:text-foreground transition-colors ml-auto"
          title="Insert Image"
        >
          <ImageIcon size={18} />
        </button>
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
    </div>
  )
}
