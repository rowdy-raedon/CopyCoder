import type React from "react"
import "./globals.css"

// Force static rendering
export const dynamic = "force-static"

// Disable revalidation
export const revalidate = false

export const metadata = {
  title: "CopyCoder by RowdyRaedon",
  description: "AI-powered prompt generator for UI screenshots and mockups",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
