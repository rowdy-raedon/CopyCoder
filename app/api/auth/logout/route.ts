import { NextResponse } from "next/server"
import { clearSession } from "@/lib/auth-utils"

export async function POST() {
  clearSession()
  return NextResponse.json({ success: true })
}
