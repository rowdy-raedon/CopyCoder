"use client"

import { useState, useRef } from "react"
import { Loader2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { GeneratedPrompt } from "@/types"
import { motion } from "framer-motion"

interface PromptDisplayProps {
  prompt: GeneratedPrompt | null
  isGenerating: boolean
}

export function PromptDisplay({ prompt, isGenerating }: PromptDisplayProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleCopy = () => {
    if (prompt?.content) {
      navigator.clipboard.writeText(prompt.content)
      setCopied(true)
      toast({
        title: "Copied to clipboard",
        description: "The prompt has been copied to your clipboard.",
      })

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Function to format markdown headings with different styles
  const formatMarkdown = (content: string) => {
    return content
      .split("\n")
      .map((line) => {
        // Format headings
        if (line.startsWith("# ")) {
          return `<h1 class="text-lg font-bold text-blue-400 mt-4 mb-2">${line.substring(2)}</h1>`
        } else if (line.startsWith("## ")) {
          return `<h2 class="text-md font-semibold text-blue-300 mt-3 mb-2">${line.substring(3)}</h2>`
        } else if (line.startsWith("### ")) {
          return `<h3 class="text-sm font-medium text-blue-200 mt-2 mb-1">${line.substring(4)}</h3>`
        } else if (line.startsWith("- ")) {
          // Format list items
          return `<div class="flex items-start my-1">
                    <span class="text-blue-400 mr-2">•</span>
                    <span>${line.substring(2)}</span>
                  </div>`
        } else if (line.trim() === "") {
          // Add spacing for empty lines
          return '<div class="h-2"></div>'
        } else {
          // Regular text
          return `<p class="my-1">${line}</p>`
        }
      })
      .join("")
  }

  return (
    <div className="bg-gradient-to-b from-[#1c1f26]/80 to-[#1c1f26] rounded-2xl border border-[#2a2f3a]/50 p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-blue-500"></div>
          <h3 className="text-sm font-medium text-gray-200">Generated Prompt</h3>
        </div>
        {prompt && (
          <Button variant="ghost" size="sm" className="h-7 text-xs flex items-center gap-1.5" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-gray-400">Copy to clipboard</span>
              </>
            )}
          </Button>
        )}
      </div>

      <div className="bg-[#0f1117]/70 rounded-lg p-4 max-h-[400px] overflow-y-auto border border-[#2a2f3a]/30 relative">
        {isGenerating ? (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-3" />
            <p className="text-sm text-gray-400">Generating prompt...</p>
          </motion.div>
        ) : prompt ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-gray-300 font-mono leading-relaxed"
          >
            <div
              ref={contentRef}
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: formatMarkdown(prompt.content) }}
            />
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[180px] text-center">
            <p className="text-sm text-gray-400 mb-2">Your generated prompt will appear here</p>
            <p className="text-xs text-gray-500">Upload images and click "Generate Prompt" to start</p>
          </div>
        )}
      </div>
    </div>
  )
}
