"use client"

import React from "react"
import Image from "next/image"
import { Upload, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFileUpload } from "@/hooks/use-file-upload"
import { formatFileSize } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface FileUploadAreaProps {
  onFileChange: (file: any) => void
  className?: string
}

export function FileUploadArea({ onFileChange, className }: FileUploadAreaProps) {
  const { file, isDragging, handleDragOver, handleDragLeave, handleDrop, handleFileUpload, removeFile } =
    useFileUpload()

  // Update parent component when file changes
  React.useEffect(() => {
    onFileChange(file)
  }, [file, onFileChange])

  return (
    <div className={cn("rounded-2xl overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`bg-gradient-to-b from-[#1c1f26]/80 to-[#1c1f26] p-8 border ${
              isDragging ? "border-blue-500/50 bg-blue-500/5" : "border-[#2a2f3a]/50"
            } flex flex-col items-center justify-center gap-6 h-[340px] cursor-pointer 
            hover:border-blue-400/30 transition-all duration-300 group`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              aria-label="Upload image"
            />
            <div className="w-16 h-16 rounded-full bg-[#0f1117]/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Upload className="h-7 w-7 text-blue-400 opacity-80" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-light text-gray-200">Drag & drop images here</p>
              <p className="text-sm text-gray-400 max-w-md">Upload websites, Figma designs, or UI mockups</p>
            </div>
            <Button className="bg-blue-600/90 hover:bg-blue-500 text-white rounded-full px-6">Choose image</Button>
            <p className="text-xs text-gray-500 text-center absolute bottom-4">
              Only one image can be uploaded at a time. Maximum size: 10MB.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gradient-to-b from-[#1c1f26]/80 to-[#1c1f26] border border-[#2a2f3a]/50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-[#2a2f3a]/50">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-green-500" />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-200 block">{file.name}</span>
                  <span className="text-xs text-gray-400">{formatFileSize(file.size)}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
                onClick={removeFile}
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
            <div className="relative h-[300px] w-full bg-[#0f1117]/50">
              <Image
                src={file.url || "/placeholder.svg"}
                alt="Uploaded image"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <div className="p-3 text-xs text-gray-400 border-t border-[#2a2f3a]/50 bg-[#0f1117]/30">
              <p>Image ready for analysis. Click "Generate Prompt" to continue.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
