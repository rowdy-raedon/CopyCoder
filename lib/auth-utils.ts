import { v4 as uuidv4 } from "uuid"
import { cookies } from "next/headers"

// Token storage (in a real app, this would be a database)
// Format: { [email]: { token: string, expires: Date, userId: string } }
const verificationTokens: Record<string, { token: string; expires: Date; userId: string }> = {}

// User storage (in a real app, this would be a database)
// Format: { [email]: { id: string, email: string, role: string } }
const users: Record<string, { id: string; email: string; role: string }> = {}

/**
 * Generate a secure verification token for email login
 */
export function generateVerificationToken(email: string): string {
  // Create user if doesn't exist
  if (!users[email]) {
    users[email] = {
      id: uuidv4(),
      email,
      role: email.includes("admin") || email.includes("rowdy") ? "admin" : "user",
    }
  }

  // Generate a secure token
  const token = uuidv4()

  // Set expiration (15 minutes from now)
  const expires = new Date()
  expires.setMinutes(expires.getMinutes() + 15)

  // Store token
  verificationTokens[email] = {
    token,
    expires,
    userId: users[email].id,
  }

  return token
}

/**
 * Verify a token and return user if valid
 */
export function verifyToken(email: string, token: string): { valid: boolean; user?: any; error?: string } {
  const storedData = verificationTokens[email]

  // Check if token exists
  if (!storedData) {
    return { valid: false, error: "Invalid verification link" }
  }

  // Check if token matches
  if (storedData.token !== token) {
    return { valid: false, error: "Invalid verification link" }
  }

  // Check if token is expired
  if (new Date() > storedData.expires) {
    // Clean up expired token
    delete verificationTokens[email]
    return { valid: false, error: "Verification link has expired" }
  }

  // Get user
  const user = users[email]
  if (!user) {
    return { valid: false, error: "User not found" }
  }

  // Clean up used token
  delete verificationTokens[email]

  return { valid: true, user }
}

/**
 * Create a session for the user
 */
export function createSession(user: any) {
  // Generate session ID
  const sessionId = uuidv4()

  // Set cookies
  cookies().set("auth_session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  // Set user data in a readable cookie for client
  cookies().set("user_data", JSON.stringify(user), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return sessionId
}

/**
 * Clear user session
 */
export function clearSession() {
  cookies().delete("auth_session")
  cookies().delete("user_data")
}

/**
 * Get current user from session
 */
export function getCurrentUser() {
  const userData = cookies().get("user_data")

  if (!userData || !userData.value) {
    return null
  }

  try {
    return JSON.parse(userData.value)
  } catch (error) {
    console.error("Failed to parse user data:", error)
    return null
  }
}
