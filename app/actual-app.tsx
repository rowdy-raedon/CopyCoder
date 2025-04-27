"use client"

import { useState, useCallback, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Simple type definitions
type Theme = "dark" | "light"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiFileUpload } from "@/components/multi-file-upload"
import { QuickTools } from "@/components/quick-tools"
import { PromptDisplay } from "@/components/prompt-display"
import { ControlPanel } from "@/components/control-panel"
import { ProjectInfoForm, type ProjectInfo } from "@/components/project-info-form"
import type { UploadedImage, GeneratedPrompt, AnalysisSettings } from "@/types"
import { generatePrompt } from "@/lib/prompt-generator"

// Safe localStorage functions
function safeGetFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error("Error getting from localStorage:", error)
    return defaultValue
  }
}

function safeSetToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("Error setting to localStorage:", error)
  }
}

// URL parameter handling
function useUrlParams() {
  const [params, setParams] = useState<Record<string, string>>({})

  useEffect(() => {
    const url = new URL(window.location.href)
    const newParams: Record<string, string> = {}

    url.searchParams.forEach((value, key) => {
      newParams[key] = value
    })

    setParams(newParams)

    // Clear URL parameters after reading them
    if (Object.keys(newParams).length > 0) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  return params
}

export default function ActualApp() {
  // URL parameters
  const urlParams = useUrlParams()

  // State
  const [isDarkMode, setIsDarkMode] = useState(true)
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

  // Handle URL parameters
  useEffect(() => {
    if (urlParams.error) {
      toast({
        title: "Authentication Error",
        description: decodeURIComponent(urlParams.error),
        variant: "destructive",
      })
    }

    if (urlParams.login === "success") {
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
        variant: "default",
      })
    }
  }, [urlParams, toast])

  // Apply theme
  useEffect(() => {
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.add("dark")
      root.style.colorScheme = "dark"
    } else {
      root.classList.remove("dark")
      root.style.colorScheme = "light"
    }

    // Save theme preference
    safeSetToLocalStorage("theme", isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  // Load theme preference
  useEffect(() => {
    const savedTheme = safeGetFromLocalStorage("theme", "dark")
    setIsDarkMode(savedTheme === "dark")
  }, [])

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
          description: `Successfully analyzed ${uploadedImages.length} ${
            uploadedImages.length === 1 ? "image" : "images"
          }.`,
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
    <div className="min-h-screen bg-[#0f1117] text-white font-sans antialiased">
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
