"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignInPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/login")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-center">Redirecting to login page...</p>
    </div>
  )
}
