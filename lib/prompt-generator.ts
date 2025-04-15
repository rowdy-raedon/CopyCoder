import { v4 as uuidv4 } from "uuid"
import type { GeneratedPrompt, UploadedImage, AnalysisSettings } from "@/types"
import type { ProjectInfo } from "@/components/project-info-form"

// Generate a more advanced prompt based on multiple images and project info
export async function generatePrompt(
  images: UploadedImage[],
  settings: AnalysisSettings,
  projectInfo: ProjectInfo,
): Promise<GeneratedPrompt> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2500))

  // Get image IDs
  const imageIds = images.map((img) => img.id)

  // Get project info with fallbacks
  const projectName = projectInfo.name || "Unnamed Project"
  const authorName = projectInfo.author || "Anonymous"
  const projectDescription = projectInfo.description || "A web application"
  const customPromptText = projectInfo.customPrompt || ""

  // Generate content based on settings and number of images
  const imageCount = images.length
  const imageText = imageCount === 1 ? "the uploaded mockup" : `the ${imageCount} uploaded mockups`

  // Create a more detailed prompt with multi-image awareness and custom project info
  const content = `# UI Implementation Specification for ${projectName}

## Overview
Create a modern web application with a dark-themed UI as shown in ${imageText}. The application is ${projectDescription} by ${authorName}.

${
  customPromptText
    ? `## Custom Requirements
${customPromptText}

`
    : ""
}${
  imageCount > 1
    ? `## Image Analysis Summary
${images.map((img, i) => `- **Image ${i + 1}**: ${img.name} - ${getRandomAnalysis(settings.analysisFocus)}`).join("\n")}

## Consolidated Requirements
The following specifications are derived from analyzing all ${imageCount} images:
`
    : ""
}

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

### Image Gallery
- Horizontal scrolling thumbnails with 64px × 64px size
- Active thumbnail indicator with blue border
- Navigation arrows for browsing multiple images
- Status indicators for upload progress and errors
- Image counter showing total uploaded images

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
${
  settings.processingOption === "expert"
    ? `
## Performance Optimization
- Implement lazy loading for images
- Use Next.js Image component with proper sizing
- Implement code splitting for large components
- Use React.memo for expensive renders
- Implement virtualization for long lists`
    : ""
}

${
  settings.processingOption === "enhanced" || settings.processingOption === "expert"
    ? `
## Animation Guidelines
- Use framer-motion for complex animations
- Keep animations subtle and purposeful
- Ensure animations respect reduced-motion preferences
- Use spring physics for natural movement
- Implement staggered animations for groups of elements`
    : ""
}

Temperature: ${settings.temperature} | Processing: ${settings.processingOption} | Generated at: ${new Date().toISOString()} | Images: ${imageCount}`

  return {
    id: uuidv4(),
    content,
    createdAt: new Date(),
    imageIds,
  }
}

// Helper function to generate random analysis for each image
function getRandomAnalysis(focus: string): string {
  const analyses = [
    `Shows a clean ${focus} interface with dark theme and blue accents`,
    `Displays a navigation structure with dropdown menus`,
    `Features a card-based layout with hover effects`,
    `Shows form elements with validation states`,
    `Demonstrates a responsive grid layout`,
    `Illustrates a modal dialog with backdrop blur`,
    `Shows a data visualization component`,
    `Features a multi-step wizard interface`,
    `Displays a notification system with different states`,
    `Shows a file upload component with progress indicators`,
  ]

  return analyses[Math.floor(Math.random() * analyses.length)]
}
