import Loading from "@/components/Loading"
import ProductFilters from "@/components/ProductFilters"
import ProductGrid from "@/components/ProductGrid"
import ProductsHeader from "@/components/ProductsHeader"
import { prisma } from "@/lib/prisma"
import { capitalizeFirstLetter } from "@/lib/utils"
import { notFound } from "next/navigation"
import { Suspense } from "react"

type PageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const category = resolvedParams.category;

  const validCategories = ["sports", "kids", "electric"]
  if (!validCategories.includes(category)) {
    notFound()
  }

  const search = typeof resolvedSearchParams.search === "string" ? resolvedSearchParams.search : undefined
  const sort = typeof resolvedSearchParams.sort === "string" ? resolvedSearchParams.sort : undefined

  const products = await prisma.product.findMany({
    where: {
      category: {
        equals: category,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  if (!products.length) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductsHeader title={`${capitalizeFirstLetter(category)} Bicycles`} count={products.length} />

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
