export type Theme = "dark" | "light"

export interface UploadedImage {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadedAt: Date
  progress?: number
  error?: string
  status: "uploading" | "complete" | "error"
}

export interface GeneratedPrompt {
  id: string
  content: string
  createdAt: Date
  imageIds: string[]
}

export interface AnalysisSettings {
  temperature: number
  analysisFocus: string
  processingOption: string
}
