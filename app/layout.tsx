import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SessionProviderWrapper from "@/components/SessionProviderWrapper"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OMSSC - Premium Bicycles",
  description: "Your one-stop shop for quality bicycles - sports, electric, and kids models",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProviderWrapper>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
