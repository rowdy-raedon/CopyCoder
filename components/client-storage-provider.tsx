"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Define the storage context type
type StorageContextType = {
  getItem: <T>(key: string, defaultValue: T) => T
  setItem: <T>(key: string, value: T) => void
  removeItem: (key: string) => void
}

// Create the context with default implementations that do nothing on the server
const StorageContext = createContext<StorageContextType>({
  getItem: (_, defaultValue) => defaultValue,
  setItem: () => {},
  removeItem: () => {},
})

// Hook to use the storage context
export function useClientStorage() {
  return useContext(StorageContext)
}

// Provider component that only runs on the client
export function ClientStorageProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  // Initialize on client side only
  useEffect(() => {
    setIsReady(true)
  }, [])

  // Storage methods that only run on the client
  const getItem = <T,>(key: string, defaultValue: T): T => {
    if (!isReady || typeof window === "undefined" || !window.localStorage) return defaultValue

    try {
      const item = localStorage.getItem(key)
      if (item === null) return defaultValue
      return JSON.parse(item) as T
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error)
      return defaultValue
    }
  }

  const setItem = <T,>(key: string, value: T): void => {
    if (!isReady || typeof window === "undefined" || !window.localStorage) return

    try {
      const stringValue = JSON.stringify(value)
      localStorage.setItem(key, stringValue)
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error)
    }
  }

  const removeItem = (key: string): void => {
    if (!isReady || typeof window === "undefined" || !window.localStorage) return

    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error)
    }
  }

  // Create the context value object
  const contextValue: StorageContextType = {
    getItem,
    setItem,
    removeItem,
  }

  return <StorageContext.Provider value={contextValue}>{children}</StorageContext.Provider>
}
