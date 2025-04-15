import { v4 as uuidv4 } from "uuid"

// Mock user type
export interface User {
  id: string
  email: string
  role: "user" | "admin"
}

// Mock authentication service
class AuthService {
  private currentUser: User | null = null
  private isAuthenticated = false
  private verificationCodes: Map<string, string> = new Map()

  // Step 1: Request email login
  async requestEmailLogin(email: string): Promise<{ success: boolean; message?: string }> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (!email || !this.isValidEmail(email)) {
      return { success: false, message: "Please enter a valid email address" }
    }

    // Generate a verification code (in a real app, this would be sent via email)
    const verificationCode = this.generateVerificationCode()
    this.verificationCodes.set(email, verificationCode)

    // In a real app, you would send an email here
    console.log(`Verification code for ${email}: ${verificationCode}`)

    return {
      success: true,
      message: "Verification email sent! Check your inbox.",
    }
  }

  // Step 2: Verify the code and log in
  async verifyEmailLogin(email: string, code: string): Promise<{ success: boolean; message?: string; user?: User }> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    const storedCode = this.verificationCodes.get(email)

    if (!storedCode || storedCode !== code) {
      return { success: false, message: "Invalid verification code" }
    }

    // Clear the verification code
    this.verificationCodes.delete(email)

    // Create user
    const isAdmin = email.includes("admin") || email.includes("rowdy")
    const user: User = {
      id: uuidv4(),
      email,
      role: isAdmin ? "admin" : "user",
    }

    // Set authenticated state
    this.currentUser = user
    this.isAuthenticated = true

    // Save to session storage for persistence
    this.saveSession(user)

    return { success: true, user }
  }

  // For demo purposes, auto-verify without email
  async autoVerifyForDemo(email: string): Promise<{ success: boolean; user?: User }> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create user
    const isAdmin = email.includes("admin") || email.includes("rowdy")
    const user: User = {
      id: uuidv4(),
      email,
      role: isAdmin ? "admin" : "user",
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
      sessionStorage.setItem("auth_token", `email-login-token-${uuidv4()}`)
    }
  }

  private generateVerificationCode(): string {
    // Generate a 6-digit code
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}

// Export singleton instance
export const authService = new AuthService()
