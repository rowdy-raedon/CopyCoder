"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Loader2, AlertCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { UploadedImage } from "@/types"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface ImageGalleryProps {
  images: UploadedImage[]
  onRemove: (id: string) => void
  onClearAll: () => void
  className?: string
}

export function ImageGallery({ images, onRemove, onClearAll, className }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // If there are no images, don't render anything
  if (images.length === 0) return null

  const activeImage = images[activeIndex]

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div
      className={cn(
        "bg-gradient-to-b from-[#1c1f26]/80 to-[#1c1f26] rounded-2xl border border-[#2a2f3a]/50 overflow-hidden",
        className,
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-[#2a2f3a]/50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-200">Uploaded Images ({images.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-400 hover:text-white" onClick={onClearAll}>
            Clear All
          </Button>
        </div>
      </div>

      {/* Main image display */}
      <div className="relative h-[300px] w-full bg-[#0f1117]/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full relative"
          >
            <Image
              src={activeImage.url || "/placeholder.svg"}
              alt={activeImage.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />

            {/* Status indicator */}
            {activeImage.status === "uploading" && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-[#0f1117]/80 p-3 rounded-lg border border-[#2a2f3a]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />
                    <span className="text-xs text-gray-300">Uploading: {activeImage.progress?.toFixed(0)}%</span>
                  </div>
                  <Progress value={activeImage.progress} className="h-1.5" />
                </div>
              </div>
            )}

            {activeImage.status === "error" && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <span className="text-xs text-red-300">{activeImage.error || "Upload failed"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next</span>
                </Button>
              </>
            )}

            {/* Remove button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
              onClick={() => onRemove(activeImage.id)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="p-3 border-t border-[#2a2f3a]/50 bg-[#0f1117]/30">
        <div className="flex gap-2 overflow-x-auto pb-2 px-1">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={cn(
                "relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0 border-2",
                activeIndex === index ? "border-blue-500" : "border-transparent hover:border-blue-500/50",
              )}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.name}
                fill
                className="object-cover"
                sizes="64px"
              />

              {/* Status indicators on thumbnails */}
              {image.status === "uploading" && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />
                </div>
              )}

              {image.status === "error" && (
                <div className="absolute inset-0 bg-red-900/50 flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                </div>
              )}

              {image.status === "complete" && (
                <div className="absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full bg-green-500/90 flex items-center justify-center">
                  <Check className="h-2.5 w-2.5 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
