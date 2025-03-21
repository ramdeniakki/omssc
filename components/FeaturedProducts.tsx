import ProductCard from "@/components/ProductCard"
import type { Product } from "@/lib/types"

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section id="featured" className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Featured Bicycles</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Discover our most popular and high-quality bicycles</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
