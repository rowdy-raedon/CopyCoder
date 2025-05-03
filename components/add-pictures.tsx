"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon, Plus, X } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { formatFileSize } from "@/lib/utils"

interface AddPicturesProps {
  onImagesChange: (images: any[]) => void
  images: any[]
}

export function AddPictures({ onImagesChange, images }: AddPicturesProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        status: "uploaded",
      }))

      onImagesChange([...images, ...newImages])

      // Reset the input value so the same file can be selected again
      e.target.value = ""
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    onImagesChange(newImages)
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
          <div className="h-1 w-1 rounded-full bg-blue-500"></div>
          <h3 className="text-lg font-medium text-gray-200">Add Pictures</h3>
        </div>

        <Button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600/90 hover:bg-blue-500 text-white rounded-full px-4"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Images
        </Button>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          aria-label="Upload images"
        />
      </div>

      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[#0f1117]/50 flex items-center justify-center mb-4">
            <ImageIcon className="h-7 w-7 text-blue-400 opacity-80" />
          </div>
          <p className="text-lg font-light text-gray-200">No images added yet</p>
          <p className="text-sm text-gray-400 max-w-md mt-2">Click the Add Images button to upload images</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative bg-[#0f1117]/50 rounded-lg border border-[#2a2f3a]/50 overflow-hidden group"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-3 border-t border-[#2a2f3a]/50">
                <p className="text-sm font-medium text-gray-200 truncate">{image.name}</p>
                <p className="text-xs text-gray-400">{formatFileSize(image.size)}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
