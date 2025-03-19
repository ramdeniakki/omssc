import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    id: "sports",
    name: "Sports Bikes",
    description: "High-performance bikes for trails and adventures",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yama%20gear.jpg-890txwTfv568qaSOpFxGrxYhEHWdAF.jpeg",
  },
  {
    id: "electric",
    name: "Electric Bikes",
    description: "Power-assisted bikes for effortless commuting",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ebike.jpg-xo9t2SKXTWyahFrBShVCSR27M9PeI4.webp",
  },
  {
    id: "kids",
    name: "Kids Bikes",
    description: "Safe and fun bikes for the little ones",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MYRO.jpg-SaPANWbikcG3eanRc4yfDCbzQnzewE.jpeg",
  },
]

export default function CategorySection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Browse By Category</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our wide range of bicycles designed for different needs and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="category-card group block overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
          >
            <div className="aspect-video w-full overflow-hidden">
              <div className="relative h-full w-full">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="category-image object-cover transition-transform"
                />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="text-muted-foreground mb-4">{category.description}</p>
              <div className="flex items-center text-primary">
                <span className="mr-2">Shop Now</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

