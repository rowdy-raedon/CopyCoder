import { v4 as uuidv4 } from "uuid"
import type { UploadedImage } from "@/types"

// Maximum file size (10MB)
export const MAX_FILE_SIZE = 10 * 1024 * 1024

// Validate file before upload
export function validateFile(file: File): { valid: boolean; message?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, message: `File size exceeds 10MB limit (${formatFileSize(file.size)})` }
  }

  // Check file type (only images)
  if (!file.type.startsWith("image/")) {
    return { valid: false, message: "Only image files are allowed" }
  }

  return { valid: true }
}

// Create uploaded image object
export function createUploadedImage(file: File): UploadedImage {
  return {
    id: uuidv4(),
    name: file.name,
    url: URL.createObjectURL(file),
    size: file.size,
    type: file.type,
    uploadedAt: new Date(),
    progress: 100, // For client-side only, we set to 100% immediately
    status: "complete",
  }
}

// Format file size to human readable format
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// Simulate image upload with progress
export async function simulateImageUpload(file: File, onProgress: (progress: number) => void): Promise<string> {
  return new Promise((resolve, reject) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        clearInterval(interval)
        progress = 100
        onProgress(progress)
        resolve(URL.createObjectURL(file))
      } else {
        onProgress(progress)
      }
    }, 300)
  })
}

// Clean up object URLs to prevent memory leaks
export function revokeImageUrls(images: UploadedImage[]): void {
  images.forEach((image) => {
    if (image.url.startsWith("blob:")) {
      URL.revokeObjectURL(image.url)
    }
  })
}

// Resize image for preview (returns a promise with the resized image URL)
export function resizeImageForPreview(file: File, maxWidth = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const scale = maxWidth / img.width
        canvas.width = maxWidth
        canvas.height = img.height * scale

        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Could not get canvas context"))
          return
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL(file.type))
      }
      img.onerror = () => {
        reject(new Error("Failed to load image"))
      }
    }
    reader.onerror = () => {
      reject(new Error("Failed to read file"))
    }
  })
}
