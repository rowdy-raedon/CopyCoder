"use client"

import type React from "react"

import { useState } from "react"
import { X, Loader2, Mail, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { sendLoginEmail } from "@/app/actions/auth-actions"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleRequestLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      const response = await sendLoginEmail(email)
      setResult(response)
    } catch (error) {
      console.error("Login error:", error)
      setResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#1c1f26] rounded-xl border border-[#2a2f3a]/70 shadow-xl w-full max-w-md mx-4"
      >
        <div className="flex items-center justify-between p-4 border-b border-[#2a2f3a]/50">
          <h2 className="text-lg font-medium text-white">Login to CopyCoder</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="p-6">
          {result?.success ? (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-blue-400" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-white">Check your inbox</h3>
                <p className="text-gray-400 text-sm">
                  We've sent a login link to <span className="text-blue-400">{email}</span>
                </p>
              </div>

              <div className="text-sm text-gray-400">
                <p>Click the link in the email to log in to your account.</p>
                <p className="mt-2">The link will expire in 15 minutes.</p>
              </div>

              <Button className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white" onClick={onClose}>
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleRequestLogin} className="space-y-4">
              {result?.success === false && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{result.message}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-[#0f1117]/70 border-[#2a2f3a]/50"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600/90 to-blue-500/90 hover:from-blue-500 hover:to-blue-400 text-white py-5 rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending login link...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Login Link
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center text-xs text-gray-500 pt-2">
                <p>We'll send a secure login link to your email</p>
                <p className="mt-1">No password required!</p>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}
