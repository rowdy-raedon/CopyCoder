"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export interface ProjectInfo {
  name: string
  author: string
  description: string
  customPrompt: string
}

interface ProjectInfoFormProps {
  onInfoChange: (info: ProjectInfo) => void
  initialInfo?: ProjectInfo
}

export function ProjectInfoForm({ onInfoChange, initialInfo }: ProjectInfoFormProps) {
  const [info, setInfo] = useState<ProjectInfo>(
    initialInfo || {
      name: "",
      author: "",
      description: "",
      customPrompt: "",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const updatedInfo = { ...info, [name]: value }
    setInfo(updatedInfo)
    onInfoChange(updatedInfo)
  }

  return (
    <motion.div
      className="bg-gradient-to-b from-[#1c1f26]/80 to-[#1c1f26] rounded-2xl border border-[#2a2f3a]/50 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="h-1 w-1 rounded-full bg-purple-500"></div>
        <h3 className="text-sm font-medium text-gray-200">Project Information</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="My Awesome Project"
              value={info.name}
              onChange={handleChange}
              className="bg-[#0f1117]/70 border-[#2a2f3a]/50 focus:border-purple-500/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author/Company</Label>
            <Input
              id="author"
              name="author"
              placeholder="Your Name"
              value={info.author}
              onChange={handleChange}
              className="bg-[#0f1117]/70 border-[#2a2f3a]/50 focus:border-purple-500/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Project Description</Label>
          <Input
            id="description"
            name="description"
            placeholder="A brief description of your project"
            value={info.description}
            onChange={handleChange}
            className="bg-[#0f1117]/70 border-[#2a2f3a]/50 focus:border-purple-500/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customPrompt">Custom Prompt (Optional)</Label>
          <Textarea
            id="customPrompt"
            name="customPrompt"
            placeholder="Add any specific instructions or details you want included in the generated prompt..."
            value={info.customPrompt}
            onChange={handleChange}
            className="bg-[#0f1117]/70 border-[#2a2f3a]/50 focus:border-purple-500/50 min-h-[100px] resize-none"
          />
        </div>
      </div>
    </motion.div>
  )
}
