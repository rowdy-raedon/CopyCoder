import { v4 as uuidv4 } from "uuid"

// Mock user type
export interface User {
  id: string
  username: string
  email: string
  role: "user" | "admin"
}

// Mock authentication service
class AuthService {
  private currentUser: User | null = null
  private isAuthenticated = false

  // Mock KeyAuth integration
  async login(username: string, password: string): Promise<{ success: boolean; message?: string; user?: User }> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // For demo purposes, accept any non-empty username/password
    if (!username || !password) {
      return { success: false, message: "Username and password are required" }
    }

    // Demo credentials (in a real app, this would be validated against KeyAuth)
    if (password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters" }
    }

    // Create mock user
    const user: User = {
      id: uuidv4(),
      username,
      email: `${username.toLowerCase()}@example.com`,
      role: username.toLowerCase() === "admin" ? "admin" : "user",
    }

    // Set authenticated state
    this.currentUser = user
    this.isAuthenticated = true

    // Save to session storage for persistence
    this.saveSession(user)

    return { success: true, user }
  }

  logout(): void {
    this.currentUser = null
    this.isAuthenticated = false

    // Clear session
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("auth_user")
      sessionStorage.removeItem("auth_token")
    }
  }

  getCurrentUser(): User | null {
    // Try to get from memory first
    if (this.currentUser) {
      return this.currentUser
    }

    // Try to get from session storage
    if (typeof window !== "undefined") {
      const userJson = sessionStorage.getItem("auth_user")
      if (userJson) {
        try {
          const user = JSON.parse(userJson)
          this.currentUser = user
          this.isAuthenticated = true
          return user
        } catch (e) {
          console.error("Failed to parse user from session storage", e)
        }
      }
    }

    return null
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser()
  }

  private saveSession(user: User): void {
    if (typeof window !== "undefined") {
      // Save user to session storage
      sessionStorage.setItem("auth_user", JSON.stringify(user))
      // Mock auth token
      sessionStorage.setItem("auth_token", `mock-token-${uuidv4()}`)
    }
  }
}

// Export singleton instance
export const authService = new AuthService()
