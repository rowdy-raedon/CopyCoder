"use server"

import nodemailer from "nodemailer"
import { generateVerificationToken, clearSession } from "@/lib/auth-utils"

/**
 * Send login email with verification link
 */
export async function sendLoginEmail(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // Validate email
    if (!email || !email.includes("@")) {
      return { success: false, message: "Please enter a valid email address" }
    }

    // Generate verification token
    const token = generateVerificationToken(email)

    // Create verification URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const verificationUrl = `${baseUrl}/api/auth/verify?email=${encodeURIComponent(email)}&token=${token}`

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: `"CopyCoder" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Login to CopyCoder",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #3B82F6;">Login to CopyCoder</h2>
          <p>Click the button below to log in to your CopyCoder account:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
              Log In to CopyCoder
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">If you didn't request this login, you can safely ignore this email.</p>
          <p style="color: #666; font-size: 14px;">This link will expire in 15 minutes.</p>
        </div>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return {
      success: true,
      message: "Verification email sent! Please check your inbox.",
    }
  } catch (error) {
    console.error("Failed to send login email:", error)
    return {
      success: false,
      message: "Failed to send verification email. Please try again.",
    }
  }
}

/**
 * Log out the current user
 */
export async function logoutUser(): Promise<{ success: boolean }> {
  try {
    clearSession()
    return { success: true }
  } catch (error) {
    console.error("Failed to logout:", error)
    return { success: false }
  }
}
