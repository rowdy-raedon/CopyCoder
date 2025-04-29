import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CopyCoder by RowdyRaedon",
  description: "AI-powered prompt generator for UI screenshots and mockups",
  keywords: ["AI", "UI", "design", "prompt", "generator", "code", "development"],
  authors: [{ name: "RowdyRaedon" }],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
