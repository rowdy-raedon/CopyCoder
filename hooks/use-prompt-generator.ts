"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"
import type { GeneratedPrompt } from "@/types"
import { createGeneratedPrompt } from "@/lib/utils"

// This would be replaced with actual API integration
const mockGeneratePrompt = async (
  imageId: string,
  options: {
    temperature: number
    focus: string
    processing: string
  },
): Promise<string> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return `# UI Implementation Specification for ${options.focus}

## Overview
Create a modern web application with a dark-themed UI as shown in the uploaded mockup. The application is a prompt generator tool called "CopyCoder" by RowdyRaedon.

## Layout Structure
- **Viewport**: Responsive design with mobile-first approach
- **Grid System**: 12-column grid with 1440px max-width container
- **Spacing System**: 4px base unit (0.25rem) with consistent spacing scale

## Color Palette
- **Primary Background**: #0f1117 (dark blue-gray)
- **Secondary Background**: #1c1f26 (slightly lighter blue-gray)
- **Panel Gradient**: linear-gradient(180deg, rgba(28,31,38,0.8) 0%, rgba(28,31,38,1) 100%)
- **Primary Accent**: #3B82F6 (bright blue)
- **Secondary Accent**: #4F46E5 (indigo)
- **Success**: #10B981 (green)
- **Warning**: #F59E0B (amber)
- **Error**: #EF4444 (red)
- **Text Primary**: #FFFFFF (white)
- **Text Secondary**: #94A3B8 (light gray)
- **Text Muted**: #64748B (medium gray)
- **Border Color**: rgba(42,47,58,0.5) (semi-transparent gray)

## Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Base Size**: 16px (1rem)
- **Scale**: 1.25 ratio
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold)
- **Line Heights**: 1.5 for body text, 1.2 for headings

## Component Specifications

### Header
- Fixed position with backdrop blur (backdrop-filter: blur(12px))
- Height: 72px
- Logo size: 36px × 36px
- Border bottom: 1px solid rgba(28,31,38,0.5)
- Right-aligned navigation with 24px spacing between items

### Upload Area
- Height: 340px when empty
- Border radius: 16px (1rem)
- Border: 1px solid rgba(42,47,58,0.5)
- Upload icon: 28px × 28px, blue (#3B82F6) with 80% opacity
- Circular background behind icon: 64px diameter, rgba(15,17,23,0.5)
- Text: 18px for primary, 14px for secondary
- Button: rounded-full with 24px horizontal padding

### Image Preview
- Maintain aspect ratio of uploaded image
- Max height: 300px
- Object-fit: contain
- Status indicator: 24px × 24px with checkmark icon
- Remove button: circular with hover effect

### Quick Access Tools
- Horizontal pill layout with flex-wrap
- Each pill: height 32px with 12px horizontal padding
- Icon size: 14px × 14px
- Text size: 12px
- Border radius: 9999px (rounded-full)
- Gap between items: 8px

### Generated Prompt
- Min height: 180px
- Border radius: 8px
- Padding: 16px
- Text size: 14px
- Line height: 1.6
- Copy button: top-right positioned

### Control Panel
- Border radius: 16px
- Padding: 32px
- Spacing between sections: 32px
- Input height: 44px
- Slider track height: 4px
- Slider thumb size: 16px × 16px

### Generate Button
- Height: 56px
- Border radius: 12px
- Font size: 16px
- Font weight: 500 (medium)
- Gradient background: linear-gradient(90deg, rgba(59,130,246,0.9) 0%, rgba(79,70,229,0.9) 100%)
- Box shadow: 0 4px 12px rgba(59,130,246,0.2)
- Loading spinner: 20px × 20px

## Interactions
- **Hover States**: Scale transform of 1.01-1.05 for clickable elements
- **Focus States**: Blue outline with 2px offset
- **Active States**: Slightly darker colors (10% darker)
- **Transitions**: 300ms duration with ease-in-out timing
- **Loading States**: Spinner animation with 1.5s rotation

## Responsive Breakpoints
- **Mobile**: < 640px (stack all elements vertically)
- **Tablet**: 640px - 1024px (2-column layout)
- **Desktop**: > 1024px (3:2 column ratio layout)

## Accessibility Requirements
- Minimum contrast ratio: 4.5:1 for all text
- Focus indicators for all interactive elements
- Proper ARIA labels for all UI components
- Screen reader support with descriptive alt text
- Keyboard navigation support

## Implementation Notes
- Use Next.js with App Router
- Implement with Tailwind CSS for styling
- Use shadcn/ui components where applicable
- Implement proper loading and error states
- Ensure responsive behavior across all device sizes
- Optimize image loading with next/image

Temperature: ${options.temperature} | Processing: ${options.processing} | Generated at: ${new Date().toISOString()}`
}

export function usePromptGenerator() {
  const [prompt, setPrompt] = useState<GeneratedPrompt | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generatePrompt = useCallback(
    async (imageId: string, options: { temperature: number; focus: string; processing: string }) => {
      if (!imageId) {
        toast({
          title: "No image selected",
          description: "Please upload an image first.",
          variant: "destructive",
        })
        return null
      }

      setIsGenerating(true)
      setPrompt(null)

      try {
        // This would be an actual API call in production
        const content = await mockGeneratePrompt(imageId, options)

        const newPrompt = createGeneratedPrompt(content, imageId)
        setPrompt(newPrompt)

        toast({
          title: "Prompt generated",
          description: "Your detailed UI specification has been generated successfully.",
        })

        return newPrompt
      } catch (error) {
        console.error("Error generating prompt:", error)

        toast({
          title: "Generation failed",
          description: "An error occurred while generating the prompt. Please try again.",
          variant: "destructive",
        })

        return null
      } finally {
        setIsGenerating(false)
      }
    },
    [toast],
  )

  return {
    prompt,
    isGenerating,
    generatePrompt,
  }
}
