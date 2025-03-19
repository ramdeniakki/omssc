import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="hero-gradient text-white">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Find Your Perfect Ride</h1>
          <p className="text-lg md:text-xl mb-8">
            Discover our premium collection of bicycles for every rider - from mountain trails to city streets, for
            adults and kids alike.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-indigo-700"
            >
              <Link href="#about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
