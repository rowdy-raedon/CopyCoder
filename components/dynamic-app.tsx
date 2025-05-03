"use client"

import { useState, useCallback, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { QuickTools } from "@/components/quick-tools"
import { PromptDisplay } from "@/components/prompt-display"
import { ControlPanel } from "@/components/control-panel"
import type { ProjectInfo } from "@/components/project-info-form"
import { AddPictures } from "@/components/add-pictures"
import { ProjectInfoSection } from "@/components/project-info-section"
import type { UploadedImage, GeneratedPrompt, AnalysisSettings } from "@/types"
import { generatePrompt } from "@/lib/prompt-generator"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DynamicApp() {
  // Add a fade-in animation
  const [isVisible, setIsVisible] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("generator")

  useEffect(() => {
    // Small delay to ensure smooth transition from skeleton
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    // Check if we should collapse sidebar by default on smaller screens
    const checkScreenSize = () => {
      if (typeof window !== "undefined") {
        setSidebarCollapsed(window.innerWidth < 1024)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", checkScreenSize)
    }
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

  // Calculate sidebar width for content margin
  const sidebarWidth = sidebarCollapsed ? 70 : 240

  // Handle sidebar navigation
  const handleAddPictures = () => {
    setActiveSection("add-pictures")
  }

  const handleProjectInfo = () => {
    setActiveSection("project-info")
  }

  // Render the active section content
  const renderActiveSection = () => {
    switch (activeSection) {
      case "add-pictures":
        return <AddPictures onImagesChange={handleImagesChange} images={uploadedImages} />
      case "project-info":
        return <ProjectInfoSection onInfoChange={handleProjectInfoChange} projectInfo={projectInfo} />
      case "generator":
      default:
        return (
          <div className="space-y-6">
            {/* Quick Access Tools */}
            <QuickTools />

            {/* Generated Prompt Display */}
            <PromptDisplay prompt={generatedPrompt} isGenerating={isGenerating} />
          </div>
        )
    }
  }

  return (
    <div
      className={`min-h-screen bg-[#0f1117] text-white font-sans antialiased transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Sidebar for desktop */}
      <div className="hidden lg:block">
        <Sidebar
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          onAddPictures={handleAddPictures}
          onProjectInfo={handleProjectInfo}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      {/* Mobile menu button and overlay */}
      <div className="lg:hidden fixed top-0 left-0 z-40 p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-[#1c1f26]/80 hover:bg-[#1c1f26] text-white"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
          <div className="lg:hidden">
            <Sidebar
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              collapsed={false}
              setCollapsed={() => setMobileMenuOpen(false)}
              onAddPictures={handleAddPictures}
              onProjectInfo={handleProjectInfo}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>
        </>
      )}

      {/* Main content */}
      <div className={`transition-all duration-300 min-h-screen`} style={{ marginLeft: `${sidebarWidth}px` }}>
        <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          {/* Page title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">UI Prompt Generator</h1>
            <p className="text-gray-400 mt-1">Upload UI designs and generate detailed implementation specifications</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Panel - 3 columns */}
            <div className="lg:col-span-3">{renderActiveSection()}</div>

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
      </div>

      <Toaster />
    </div>
  )
}
