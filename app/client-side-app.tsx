"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// This is a placeholder component that will be shown during loading
function LoadingApp() {
  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
      <div className="animate-pulse text-white text-opacity-50">Loading application...</div>
    </div>
  )
}

// This is the actual component that will be rendered only on the client side
function ClientSideApp() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <LoadingApp />
  }

  // Import the actual app component
  const ActualApp = require("./actual-app").default
  return <ActualApp />
}

// Export the component with no SSR
export default dynamic(() => Promise.resolve(ClientSideApp), {
  ssr: false,
})
