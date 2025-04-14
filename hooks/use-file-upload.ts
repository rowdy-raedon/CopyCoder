"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"
import type { UploadedFile } from "@/types"
import { validateFile, createUploadedFile } from "@/lib/utils"

export function useFileUpload() {
  const [file, setFile] = useState<UploadedFile | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const { toast } = useToast()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [])

  const handleFileUpload = useCallback(
    (fileToUpload: File) => {
      // Validate file
      const validation = validateFile(fileToUpload)

      if (!validation.valid) {
        toast({
          title: "Upload failed",
          description: validation.message,
          variant: "destructive",
        })
        return
      }

      // Clean up previous file URL if exists
      if (file?.url) {
        URL.revokeObjectURL(file.url)
      }

      // Create new file object
      const newFile = createUploadedFile(fileToUpload)
      setFile(newFile)

      toast({
        title: "Image uploaded",
        description: `${fileToUpload.name} has been uploaded successfully.`,
      })
    },
    [file, toast],
  )

  const removeFile = useCallback(() => {
    if (file?.url) {
      URL.revokeObjectURL(file.url)
      setFile(null)
    }
  }, [file])

  return {
    file,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileUpload,
    removeFile,
  }
}
