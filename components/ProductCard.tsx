import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/currency"
import type { Product } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="product-card group block overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
    >
      <div className="aspect-square w-full overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            className="product-image object-cover transition-transform"
          />
        </div>
      </div>
      <div className="p-4">
        <Badge className="mb-2">{product.category}</Badge>
        <h3 className="font-semibold line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
        <p className="font-bold text-primary">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}
