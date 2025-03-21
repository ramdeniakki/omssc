"use client"

import { Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      const navbarHeight = 64
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth"
      })
    } else {
      // If on a different page, navigate to the homepage with the anchor
      window.location.href = `/#${sectionId}`
    }
  }

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">OMSSC</h3>
            <p className="text-muted-foreground mb-4">
              Your one-stop shop for quality bicycles - sports, electric, and kids models.
            </p>
            <div className="flex space-x-4">
              <a href="https://x.com/ramdeniaadi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary">
                  All Bikes
                </Link>
              </li>
              <li>
                <Link href="/categories/sports" className="text-muted-foreground hover:text-primary">
                  Sports Bikes
                </Link>
              </li>
              <li>
                <Link href="/categories/electric" className="text-muted-foreground hover:text-primary">
                  Electric Bikes
                </Link>
              </li>
              <li>
                <Link href="/categories/kids" className="text-muted-foreground hover:text-primary">
                  Kids Bikes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#about"
                  className="text-muted-foreground hover:text-primary"
                  onClick={(e) => scrollToSection(e, "about")}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-muted-foreground hover:text-primary"
                  onClick={(e) => scrollToSection(e, "services")}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p>Near Bus stand Main Road</p>
              <p>Gadchandur, Chandrapur</p>
              <div className="flex items-center gap-2 mt-2">
                <Phone className="h-4 w-4" />
                <p>(+91) 9860224423</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <p>workingwithakki@gmail.com</p>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} OMSSC. All rights reserved.
          </p>
          <div className="mt-2">
            <p className="text-muted-foreground text-sm mb-2">
              Developed by <span className="font-semibold">Ramdeni Akshith</span> (Full Stack Engineer)
            </p>
            <div className="flex justify-center space-x-4 mt-1">
              <a href="https://www.linkedin.com/in/ramdeni-akshith-b96b01203/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" title="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/akki_ramdeni/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" title="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://x.com/ramdeniaadi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" title="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="mailto:workingwithakki@gmail.com" className="text-muted-foreground hover:text-primary" title="Email">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
