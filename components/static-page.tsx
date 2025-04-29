"use client"

import { useEffect, useState } from "react"
import { DynamicApp } from "./dynamic-app"
import { SkeletonUI } from "./skeleton-ui"

export function StaticPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Show the skeleton UI until client-side code is ready
  if (!isClient) {
    return <SkeletonUI />
  }

  // Once on the client, render the full app
  return <DynamicApp />
}
