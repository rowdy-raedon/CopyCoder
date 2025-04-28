import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, createSession } from "@/lib/auth-utils"

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams
  const email = searchParams.get("email")
  const token = searchParams.get("token")

  // Validate parameters
  if (!email || !token) {
    return NextResponse.redirect(new URL("/?error=invalid_link", request.url))
  }

  // Verify token
  const result = verifyToken(email, token)

  if (!result.valid) {
    return NextResponse.redirect(new URL(`/?error=${result.error}`, request.url))
  }

  // Create session
  createSession(result.user)

  // Redirect to home page with success message
  return NextResponse.redirect(new URL("/?login=success", request.url))
}
