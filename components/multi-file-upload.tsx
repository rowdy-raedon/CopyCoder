"use client"

import React from "react"
import { Upload, ImageIcon, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMultiFileUpload } from "@/hooks/use-multi-file-upload"
import { ImageGallery } from "@/components/image-gallery"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface MultiFileUploadProps {
  onImagesChange: (images: any[]) => void
  maxFiles?: number
  className?: string
}

export function MultiFileUpload({ onImagesChange, maxFiles = 50, className }: MultiFileUploadProps) {
  const {
    images,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFilesUpload,
    removeImage,
    clearAllImages,
  } = useMultiFileUpload(maxFiles)

  // Update parent component when images change
  React.useEffect(() => {
    onImagesChange(images)
  }, [images, onImagesChange])

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesUpload(Array.from(e.target.files))
      // Reset the input value so the same file can be selected again
      e.target.value = ""
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload area */}
      <div
        className={`bg-gradient-to-b from-[#1c1f26]/80 to-[#1c1f26] rounded-2xl p-6 border ${
          isDragging ? "border-blue-500/50 bg-blue-500/5" : "border-[#2a2f3a]/50"
        } flex flex-col items-center justify-center gap-6 h-[240px] cursor-pointer 
        hover:border-blue-400/30 transition-all duration-300 group relative`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("multi-file-upload")?.click()}
      >
        <input
          type="file"
          id="multi-file-upload"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          aria-label="Upload images"
        />

        <AnimatePresence mode="wait">
          {images.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#0f1117]/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 mb-4">
                <Upload className="h-7 w-7 text-blue-400 opacity-80" />
              </div>
              <p className="text-lg font-light text-gray-200">Drag & drop images here</p>
              <p className="text-sm text-gray-400 max-w-md mt-2">Upload websites, Figma designs, or UI mockups</p>
              <Button className="bg-blue-600/90 hover:bg-blue-500 text-white rounded-full px-6 mt-4">
                Choose images
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="has-images"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#0f1117]/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 mb-3">
                <ImageIcon className="h-6 w-6 text-blue-400 opacity-80" />
              </div>
              <p className="text-base font-light text-gray-200">Add more images</p>
              <p className="text-sm text-gray-400 max-w-md mt-1">
                {images.length} of {maxFiles} images uploaded
              </p>
              <Button className="bg-blue-600/90 hover:bg-blue-500 text-white rounded-full px-5 mt-3 text-sm">
                <Plus className="h-4 w-4 mr-1" /> Add more
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-xs text-gray-500 text-center absolute bottom-3">
          Upload up to {maxFiles} images. Maximum size: 10MB each.
        </p>
      </div>

      {/* Image gallery */}
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ImageGallery images={images} onRemove={removeImage} onClearAll={clearAllImages} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
