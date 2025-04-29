"use client"

import { useState, useCallback, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiFileUpload } from "@/components/multi-file-upload"
import { QuickTools } from "@/components/quick-tools"
import { PromptDisplay } from "@/components/prompt-display"
import { ControlPanel } from "@/components/control-panel"
import { ProjectInfoForm, type ProjectInfo } from "@/components/project-info-form"
import type { UploadedImage, GeneratedPrompt, AnalysisSettings } from "@/types"
import { generatePrompt } from "@/lib/prompt-generator"

export function DynamicApp() {
  // Add a fade-in animation
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Small delay to ensure smooth transition from skeleton
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get theme from cookie if available
    if (typeof document !== "undefined") {
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim())
      const themeCookie = cookies.find((cookie) => cookie.startsWith("copycoder-theme="))
      if (themeCookie) {
        return themeCookie.split("=")[1] === "light" ? false : true
      }
    }
    return true // Default to dark mode
  })

  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [generatedPrompt, setGeneratedPrompt] = useState<GeneratedPrompt | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    name: "",
    author: "",
    description: "",
    customPrompt: "",
  })

  const { toast } = useToast()

  // Apply theme
  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add("dark")
      root.style.colorScheme = "dark"
      document.cookie = "copycoder-theme=dark; path=/; max-age=31536000"
    } else {
      root.classList.remove("dark")
      root.style.colorScheme = "light"
      document.cookie = "copycoder-theme=light; path=/; max-age=31536000"
    }
  }, [isDarkMode])

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev)
  }, [])

  // Handle images change
  const handleImagesChange = useCallback((images: UploadedImage[]) => {
    setUploadedImages(images)
  }, [])

  // Handle project info change
  const handleProjectInfoChange = useCallback((info: ProjectInfo) => {
    setProjectInfo(info)
  }, [])

  // Generate prompt
  const handleGeneratePrompt = useCallback(
    async (settings: AnalysisSettings) => {
      if (uploadedImages.length === 0) {
        toast({
          title: "No images uploaded",
          description: "Please upload at least one image first.",
          variant: "destructive",
        })
        return
      }

      // Check if any images are still uploading
      const stillUploading = uploadedImages.some((img) => img.status === "uploading")
      if (stillUploading) {
        toast({
          title: "Images still uploading",
          description: "Please wait for all images to finish uploading.",
          variant: "destructive",
        })
        return
      }

      setIsGenerating(true)
      setGeneratedPrompt(null)

      try {
        // Generate prompt based on all uploaded images and project info
        const prompt = await generatePrompt(uploadedImages, settings, projectInfo)
        setGeneratedPrompt(prompt)

        toast({
          title: "Prompt generated",
          description: `Successfully analyzed ${uploadedImages.length} ${uploadedImages.length === 1 ? "image" : "images"}.`,
        })
      } catch (error) {
        console.error("Error generating prompt:", error)
        toast({
          title: "Generation failed",
          description: "An error occurred while generating the prompt. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsGenerating(false)
      }
    },
    [uploadedImages, toast, projectInfo],
  )

  return (
    <div
      className={`min-h-screen bg-[#0f1117] text-white font-sans antialiased transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Panel - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Multi-File Upload Area */}
            <MultiFileUpload onImagesChange={handleImagesChange} maxFiles={50} />

            {/* Project Information Form */}
            <ProjectInfoForm onInfoChange={handleProjectInfoChange} />

            {/* Quick Access Tools */}
            <QuickTools />

            {/* Generated Prompt Display */}
            <PromptDisplay prompt={generatedPrompt} isGenerating={isGenerating} />
          </div>

          {/* Right Panel - 2 columns */}
          <div className="lg:col-span-2">
            <ControlPanel
              onGenerate={handleGeneratePrompt}
              isGenerating={isGenerating}
              hasImages={uploadedImages.length > 0}
              imageCount={uploadedImages.length}
            />
          </div>
        </div>
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}
