"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Copy, Download, Trash2 } from "lucide-react"
import type { GeneratedPrompt } from "@/types"

interface PromptsSectionProps {
  generatedPrompt: GeneratedPrompt | null
}

export function PromptsSection({ generatedPrompt }: PromptsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [savedPrompts, setSavedPrompts] = useState<GeneratedPrompt[]>(generatedPrompt ? [generatedPrompt] : [])

  // Sample prompts for demonstration
  const samplePrompts: GeneratedPrompt[] = [
    {
      prompt:
        "Create a modern dashboard interface with dark theme, featuring analytics charts, user statistics, and a sidebar navigation. Include a top navbar with user profile and notifications. Use a color scheme of dark blue, purple accents, and white text.",
      timestamp: new Date().toISOString(),
    },
    {
      prompt:
        "Design a mobile app login screen with a minimalist aesthetic. Include email and password fields, social login options, and a prominent sign-in button. Use a gradient background from teal to blue with white form elements.",
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
  ]

  // Combine real and sample prompts
  const allPrompts = [...savedPrompts, ...samplePrompts].filter((prompt) =>
    prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Show success message (could use toast here)
        console.log("Copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  const deletePrompt = (index: number) => {
    const newPrompts = [...allPrompts]
    newPrompts.splice(index, 1)
    setSavedPrompts(newPrompts.filter((p) => !samplePrompts.includes(p)))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-[#1c1f26]/50 rounded-xl p-6 border border-[#2a2f3a]/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Saved Prompts</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search prompts..."
                className="pl-9 bg-[#0f1117]/70 border-[#2a2f3a]/50 w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="border-[#2a2f3a]/50">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        {allPrompts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No prompts found. Generate a prompt to see it here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allPrompts.map((prompt, index) => (
              <div key={index} className="bg-[#0f1117]/70 rounded-lg p-4 border border-[#2a2f3a]/30 group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-gray-400">{formatDate(prompt.timestamp)}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => copyToClipboard(prompt.prompt)}
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span className="sr-only">Copy</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Download className="h-3.5 w-3.5" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-red-400"
                      onClick={() => deletePrompt(index)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-200 line-clamp-3">{prompt.prompt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
