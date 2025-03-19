import { Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
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
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
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
                <Link href="#about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-muted-foreground hover:text-primary">
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
              <p className="mt-2">Phone: (+91) 9860224423</p>
              <p>Email: workingwithakki@gmail.com</p>
            </address>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OMSSC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
