import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid"
import type { UploadedImage, GeneratedPrompt } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format file size to human readable format
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// Validate file before upload
export function validateFile(file: File): { valid: boolean; message?: string } {
  // Check file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    return { valid: false, message: "File size exceeds 10MB limit" }
  }

  // Check file type (only images)
  if (!file.type.startsWith("image/")) {
    return { valid: false, message: "Only image files are allowed" }
  }

  return { valid: true }
}

// Create uploaded file object
export function createUploadedFile(file: File): UploadedImage {
  return {
    id: uuidv4(),
    name: file.name,
    url: URL.createObjectURL(file),
    size: file.size,
    type: file.type,
    uploadedAt: new Date(),
    status: "complete",
  }
}

// Create generated prompt object
export function createGeneratedPrompt(content: string, imageId: string): GeneratedPrompt {
  return {
    id: uuidv4(),
    content,
    createdAt: new Date(),
    imageIds: [imageId],
  }
}
