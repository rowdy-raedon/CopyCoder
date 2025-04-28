"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useMemo } from "react"
import type { AppState, AppSettings, UploadedFile, GeneratedPrompt } from "@/types"
import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils"

// Default settings
const defaultSettings: AppSettings = {
  theme: "dark",
  temperature: 0.7,
  analysisFocus: "web",
  processingOption: "standard",
}

// Default state
const defaultState: AppState = {
  currentFile: null,
  currentPrompt: null,
  isGenerating: false,
  settings: defaultSettings,
  history: {
    files: [],
    prompts: [],
  },
}

// Context type
type AppContextType = {
  state: AppState
  setCurrentFile: (file: UploadedFile | null) => void
  setCurrentPrompt: (prompt: GeneratedPrompt | null) => void
  setIsGenerating: (isGenerating: boolean) => void
  updateSettings: (settings: Partial<AppSettings>) => void
  addToHistory: (item: UploadedFile | GeneratedPrompt) => void
  clearHistory: () => void
  toggleTheme: () => void
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined)

// Provider component
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    // Load from localStorage if available
    const savedState = getFromLocalStorage<AppState>("appState", defaultState)

    // Apply theme from saved state
    if (typeof window !== "undefined") {
      const root = window.document.documentElement
      if (savedState.settings.theme === "dark") {
        root.classList.add("dark")
        root.style.colorScheme = "dark"
      } else {
        root.classList.remove("dark")
        root.style.colorScheme = "light"
      }
    }

    return savedState
  })

  // Save state to localStorage when it changes
  useEffect(() => {
    saveToLocalStorage("appState", state)
  }, [state])

  // State update functions
  const setCurrentFile = (file: UploadedFile | null) => {
    setState((prev) => ({ ...prev, currentFile: file }))
  }

  const setCurrentPrompt = (prompt: GeneratedPrompt | null) => {
    setState((prev) => ({ ...prev, currentPrompt: prompt }))
  }

  const setIsGenerating = (isGenerating: boolean) => {
    setState((prev) => ({ ...prev, isGenerating }))
  }

  const updateSettings = (settings: Partial<AppSettings>) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }))
  }

  const addToHistory = (item: UploadedFile | GeneratedPrompt) => {
    setState((prev) => {
      if ("url" in item) {
        // It's a file
        return {
          ...prev,
          history: {
            ...prev.history,
            files: [item, ...prev.history.files].slice(0, 10), // Keep only last 10
          },
        }
      } else {
        // It's a prompt
        return {
          ...prev,
          history: {
            ...prev.history,
            prompts: [item, ...prev.history.prompts].slice(0, 10), // Keep only last 10
          },
        }
      }
    })
  }

  const clearHistory = () => {
    setState((prev) => ({
      ...prev,
      history: { files: [], prompts: [] },
    }))
  }

  const toggleTheme = () => {
    setState((prev) => {
      const newTheme = prev.settings.theme === "dark" ? "light" : "dark"

      // Apply theme change to DOM
      if (typeof window !== "undefined") {
        const root = window.document.documentElement
        if (newTheme === "dark") {
          root.classList.add("dark")
          root.style.colorScheme = "dark"
        } else {
          root.classList.remove("dark")
          root.style.colorScheme = "light"
        }
      }

      return {
        ...prev,
        settings: {
          ...prev.settings,
          theme: newTheme,
        },
      }
    })
  }

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      state,
      setCurrentFile,
      setCurrentPrompt,
      setIsGenerating,
      updateSettings,
      addToHistory,
      clearHistory,
      toggleTheme,
    }),
    [state],
  )

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }

  return context
}
