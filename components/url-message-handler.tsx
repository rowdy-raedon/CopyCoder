"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function UrlMessageHandler() {
  const searchParams = useSearchParams()
  const { toast } = useToast()

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

  // Render visual feedback for URL parameters
  return (
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
  )
}
