"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import type { UploadedImage } from "@/types"
import { validateFile, createUploadedImage, simulateImageUpload, revokeImageUrls } from "@/lib/image-utils"

export function useMultiFileUpload(maxFiles = 10) {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const { toast } = useToast()

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      revokeImageUrls(images)
    }
  }, [])

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

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFilesUpload(files)
    }
  }, [])

  const updateImageProgress = useCallback((id: string, progress: number) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, progress, status: progress === 100 ? "complete" : "uploading" } : img,
      ),
    )
  }, [])

  const handleFilesUpload = useCallback(
    (filesToUpload: File[]) => {
      // Check if adding these files would exceed the maximum
      if (images.length + filesToUpload.length > maxFiles) {
        toast({
          title: "Too many files",
          description: `You can upload a maximum of ${maxFiles} images.`,
          variant: "destructive",
        })
        return
      }

      // Process each file
      filesToUpload.forEach(async (file) => {
        // Validate file
        const validation = validateFile(file)

        if (!validation.valid) {
          toast({
            title: "Upload failed",
            description: validation.message,
            variant: "destructive",
          })
          return
        }

        // Create initial image object with 0% progress
        const newImage = createUploadedImage(file)
        newImage.progress = 0
        newImage.status = "uploading"

        // Add to state
        setImages((prev) => [...prev, newImage])

        try {
          // Simulate upload with progress
          await simulateImageUpload(file, (progress) => {
            updateImageProgress(newImage.id, progress)
          })

          toast({
            title: "Image uploaded",
            description: `${file.name} has been uploaded successfully.`,
          })
        } catch (error) {
          // Handle upload error
          setImages((prev) =>
            prev.map((img) => (img.id === newImage.id ? { ...img, error: "Upload failed", status: "error" } : img)),
          )

          toast({
            title: "Upload failed",
            description: `Failed to upload ${file.name}.`,
            variant: "destructive",
          })
        }
      })
    },
    [images.length, toast, updateImageProgress, maxFiles],
  )

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id)
      if (imageToRemove?.url) {
        URL.revokeObjectURL(imageToRemove.url)
      }
      return prev.filter((img) => img.id !== id)
    })
  }, [])

  const clearAllImages = useCallback(() => {
    revokeImageUrls(images)
    setImages([])
  }, [images])

  return {
    images,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFilesUpload,
    removeImage,
    clearAllImages,
  }
}
