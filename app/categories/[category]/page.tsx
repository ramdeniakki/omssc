import { Suspense } from "react"
import { notFound } from "next/navigation"
import ProductGrid from "@/components/ProductGrid"
import ProductFilters from "@/components/ProductFilters"
import ProductsHeader from "@/components/ProductsHeader"
import { getProductsByCategory } from "@/lib/products"
import Loading from "@/components/Loading"
import { capitalizeFirstLetter } from "@/lib/utils"

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const validCategories = ["sports", "kids", "electric"]
  if (!validCategories.includes(params.category)) {
    notFound()
  }

  const search = typeof searchParams.search === "string" ? searchParams.search : undefined
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : undefined

  const products = await getProductsByCategory(params.category, { search, sort })

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductsHeader title={`${capitalizeFirstLetter(params.category)} Bicycles`} count={products.length} />

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

