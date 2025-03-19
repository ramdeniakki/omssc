"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ModeToggle } from "./ModeToggle"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const { data: session } = useSession()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "All Bikes" },
    { href: "/categories/sports", label: "Sports" },
    { href: "/categories/electric", label: "Electric" },
    { href: "/categories/kids", label: "Kids" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">OMSSC</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search bikes..."
                className="w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <ModeToggle />

            {session?.user.isAdmin ? (
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            ) : (
              <Link href="/api/auth/signin">
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}

            <Button variant="outline" size="icon">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search bikes..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === link.href ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-between pt-4">
              <ModeToggle />

              <div className="flex items-center space-x-4">
                {session?.user.isAdmin ? (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      Admin
                    </Button>
                  </Link>
                ) : (
                  <Link href="/api/auth/signin">
                    <Button variant="outline" size="icon">
                      <User className="h-4 w-4" />
                    </Button>
                  </Link>
                )}

                <Button variant="outline" size="icon">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
