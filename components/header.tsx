"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Github, Moon, Sun, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { LoginModal } from "@/components/login-modal"
import { UserProfile } from "@/components/user-profile"
import { useToast } from "@/components/ui/use-toast"

interface HeaderProps {
  isDarkMode: boolean
  toggleTheme: () => void
}

export function Header({ isDarkMode, toggleTheme }: HeaderProps) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Check URL parameters for auth messages
  useEffect(() => {
    const error = searchParams.get("error")
    const login = searchParams.get("login")

    if (error) {
      toast({
        title: "Authentication Error",
        description: decodeURIComponent(error),
        variant: "destructive",
      })
    }

    if (login === "success") {
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
        variant: "default",
      })
    }
  }, [searchParams, toast])

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        // Try to get user data from cookie
        const userDataCookie = document.cookie.split("; ").find((row) => row.startsWith("user_data="))

        if (userDataCookie) {
          const userData = JSON.parse(decodeURIComponent(userDataCookie.split("=")[1]))
          setUser(userData)
        }
      } catch (error) {
        console.error("Failed to get user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  const handleLogout = async () => {
    try {
      // Call logout action
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        setUser(null)
        toast({
          title: "Logged Out",
          description: "You have been logged out successfully.",
        })
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <>
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

            {isLoading ? (
              <div className="h-9 w-24 bg-[#1c1f26] rounded-full animate-pulse"></div>
            ) : user ? (
              <UserProfile user={user} onLogout={handleLogout} />
            ) : (
              <Button
                className="bg-blue-600 hover:bg-blue-500 rounded-full px-5 text-sm font-medium"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </motion.header>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      {/* Status messages */}
      <AnimatePresence>
        {searchParams.get("error") && (
          <motion.div
            className="fixed bottom-4 right-4 bg-red-900/90 text-white px-4 py-3 rounded-lg shadow-lg flex items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{decodeURIComponent(searchParams.get("error") || "")}</span>
          </motion.div>
        )}

        {searchParams.get("login") === "success" && (
          <motion.div
            className="fixed bottom-4 right-4 bg-green-900/90 text-white px-4 py-3 rounded-lg shadow-lg flex items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <CheckCircle2 className="h-5 w-5 mr-2" />
            <span>Login successful!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
