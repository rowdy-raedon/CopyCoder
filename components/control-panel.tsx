"use client"

import { useState } from "react"
import { Loader2, Zap, Sparkles, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import type { AnalysisSettings } from "@/types"

interface ControlPanelProps {
  onGenerate: (options: AnalysisSettings) => void
  isGenerating: boolean
  hasImages: boolean
  imageCount: number
}

// Analysis focus options
const focusOptions = [
  { value: "web", label: "Web applications" },
  { value: "mobile", label: "Mobile applications" },
  { value: "desktop", label: "Desktop applications" },
  { value: "ui", label: "UI components" },
  { value: "landing", label: "Landing pages" },
]

// Processing options with more details
const processingOptions = [
  {
    value: "standard",
    label: "Standard",
    description: "Balanced analysis with good detail",
    icon: <Zap className="h-4 w-4 text-yellow-400" />,
  },
  {
    value: "enhanced",
    label: "Enhanced",
    description: "Deeper analysis with more details",
    icon: <Sparkles className="h-4 w-4 text-purple-400" />,
  },
  {
    value: "expert",
    label: "Expert",
    description: "Professional-level implementation details",
    icon: <Lightbulb className="h-4 w-4 text-blue-400" />,
  },
]

export function ControlPanel({ onGenerate, isGenerating, hasImages, imageCount }: ControlPanelProps) {
  // Local state for settings
  const [settings, setSettings] = useState<AnalysisSettings>({
    temperature: 0.7,
    analysisFocus: "web",
    processingOption: "standard",
  })

  // Handle generate button click
  const handleGenerate = () => {
    onGenerate(settings)
  }

  return (
    <motion.div
      className="bg-gradient-to-b from-[#1c1f26]/80 to-[#1c1f26] rounded-2xl p-6 border border-[#2a2f3a]/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Analysis Focus */}
        <div className="space-y-3">
          <label className="text-sm text-gray-300 flex items-center gap-2 font-medium">
            Choose analysis focus
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          </label>
          <Select
            value={settings.analysisFocus}
            onValueChange={(value) => setSettings((prev) => ({ ...prev, analysisFocus: value }))}
          >
            <SelectTrigger className="bg-[#0f1117]/80 border-[#2a2f3a] rounded-lg h-11">
              <SelectValue placeholder="Select focus" />
            </SelectTrigger>
            <SelectContent className="bg-[#1c1f26] border-[#2a2f3a]">
              {focusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Middle column - Temperature */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-300 font-medium">Temperature</label>
            <span className="text-xs text-blue-400 font-mono bg-blue-500/10 px-2 py-1 rounded-md">
              {settings.temperature.toFixed(1)}
            </span>
          </div>
          <Slider
            value={[settings.temperature]}
            max={1}
            step={0.1}
            className="py-4"
            onValueChange={(value) => setSettings((prev) => ({ ...prev, temperature: value[0] }))}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Precise</span>
            <span>Creative</span>
          </div>
        </div>

        {/* Right column - Processing Options */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Processing Options</h4>
          <div className="grid grid-cols-3 gap-2">
            {processingOptions.map((option) => (
              <div
                key={option.value}
                className={`p-2 rounded-lg ${
                  settings.processingOption === option.value
                    ? "bg-blue-900/30 border-blue-500/50"
                    : "bg-[#0f1117]/80 border-[#2a2f3a]/50"
                } cursor-pointer hover:border-blue-500/30 transition-all border flex flex-col items-center justify-center text-center h-24`}
                onClick={() => setSettings((prev) => ({ ...prev, processingOption: option.value }))}
              >
                <div className="mb-2">{option.icon}</div>
                <span className="text-sm font-medium block">{option.label}</span>
                <span className="text-xs text-gray-400 line-clamp-1">{option.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image count and Generate Button */}
      <div className="mt-6 flex items-center justify-between">
        <div>
          {hasImages && (
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              {imageCount} {imageCount === 1 ? "image" : "images"} selected
            </Badge>
          )}
        </div>
        <Button
          className="bg-gradient-to-r from-blue-600/90 to-blue-500/90 hover:from-blue-500 hover:to-blue-400 text-white py-6 px-8 text-base font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-900/20 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          onClick={handleGenerate}
          disabled={isGenerating || !hasImages}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Prompt"
          )}
        </Button>
      </div>

      {!hasImages && <p className="text-xs text-gray-500 text-center mt-3">Please upload at least one image first</p>}
    </motion.div>
  )
}
