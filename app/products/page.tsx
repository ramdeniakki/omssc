import { Suspense } from "react"
import ProductGrid from "@/components/ProductGrid"
import ProductFilters from "@/components/ProductFilters"
import ProductsHeader from "@/components/ProductsHeader"
import { getAllProducts } from "@/lib/products"
import Loading from "@/components/Loading"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : undefined

  const products = await getAllProducts({ category, search, sort })

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductsHeader title="All Bicycles" count={products.length} />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProductFilters />
        </div>

        <div className="w-full md:w-3/4">
          <Suspense fallback={<Loading />}>
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

