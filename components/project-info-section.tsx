"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { ProjectInfo } from "@/components/project-info-form"

interface ProjectInfoSectionProps {
  onInfoChange: (info: ProjectInfo) => void
  projectInfo: ProjectInfo
}

export function ProjectInfoSection({ onInfoChange, projectInfo }: ProjectInfoSectionProps) {
  const [info, setInfo] = useState<ProjectInfo>(projectInfo)

  useEffect(() => {
    setInfo(projectInfo)
  }, [projectInfo])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const updatedInfo = { ...info, [name]: value }
    setInfo(updatedInfo)
  }

  const handleSave = () => {
    onInfoChange(info)
  }

  return (
    <motion.div
      className="bg-gradient-to-b from-[#1c1f26]/80 to-[#1c1f26] rounded-2xl border border-[#2a2f3a]/50 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-purple-500"></div>
          <h3 className="text-lg font-medium text-gray-200">Project Information</h3>
        </div>

        <Button onClick={handleSave} className="bg-purple-600/90 hover:bg-purple-500 text-white rounded-full px-4">
          Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            className="bg-[#0f1117]/70 border-[#2a2f3a]/50 focus:border-purple-500/50 min-h-[150px] resize-none"
          />
        </div>
      </div>
    </motion.div>
  )
}
