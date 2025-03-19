import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ success: true })
    }

    const response = NextResponse.json({ success: true })

    // Clear all auth-related cookies
    response.cookies.delete("next-auth.session-token")
    response.cookies.delete("__Secure-next-auth.session-token")
    response.cookies.delete("next-auth.csrf-token")
    response.cookies.delete("next-auth.callback-url")
    response.cookies.delete("next-auth.pkce.code_verifier")

    return response
  } catch (error) {
    console.error("Error signing out:", error)
    return NextResponse.json(
      { error: "Error signing out" },
      { status: 500 }
    )
  }
}
