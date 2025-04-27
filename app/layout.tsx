import type React from "react"
import "./globals.css"

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
