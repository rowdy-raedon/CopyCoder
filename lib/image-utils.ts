import { v4 as uuidv4 } from "uuid"
import type { UploadedImage } from "@/types"

// Maximum file size (10MB)
export const MAX_FILE_SIZE = 10 * 1024 * 1024

/**
 * Validates a file before upload
 * @param file The file to validate
 * @returns An object with valid flag and optional error message
 */
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

/**
 * Formats file size to human readable format
 * @param bytes Size in bytes
 * @returns Formatted string (e.g., "5.2 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

/**
 * Creates an uploaded image object
 * @param file The file to create an image object from
 * @returns UploadedImage object
 */
export function createUploadedImage(file: File): UploadedImage {
  return {
    id: uuidv4(),
    name: file.name,
    url: URL.createObjectURL(file),
    size: file.size,
    type: file.type,
    uploadedAt: new Date(),
    progress: 100,
    status: "complete",
  }
}

/**
 * Simulates image upload with progress
 * @param file The file to upload
 * @param onProgress Callback for progress updates
 * @returns Promise with the image URL
 */
export async function simulateImageUpload(file: File, onProgress: (progress: number) => void): Promise<string> {
  return new Promise((resolve) => {
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

/**
 * Revokes object URLs to prevent memory leaks
 * @param images Array of uploaded images
 */
export function revokeImageUrls(images: UploadedImage[]): void {
  images.forEach((image) => {
    if (image.url.startsWith("blob:")) {
      URL.revokeObjectURL(image.url)
    }
  })
}

/**
 * Resizes an image for preview
 * @param file The file to resize
 * @param maxWidth Maximum width for the resized image
 * @returns Promise with the resized image URL
 */
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
