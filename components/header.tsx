"use client"
import Link from "next/link"
import Image from "next/image"
import { Github, Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

interface HeaderProps {
  isDarkMode: boolean
  toggleTheme: () => void
}

export function Header({ isDarkMode, toggleTheme }: HeaderProps) {
  return (
    <motion.header
      className="border-b border-[#1c1f26]/50 py-4 px-6 sticky top-0 z-10 backdrop-blur-lg bg-[#0f1117]/80"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/10 group-hover:ring-blue-500/50 transition-all duration-300">
            <Image src="/images/logo.png" alt="RowdyRaedon Logo" width={36} height={36} className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold tracking-tight group-hover:text-blue-400 transition-colors duration-300">
              CopyCoder
            </span>
            <span className="text-[10px] text-blue-400/80">by RowdyRaedon</span>
          </div>
        </Link>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="h-5 w-5 text-gray-400" /> : <Moon className="h-5 w-5" />}
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </motion.header>
  )
}
