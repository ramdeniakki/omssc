import Loading from "@/components/Loading"
import ProductFilters from "@/components/ProductFilters"
import ProductGrid from "@/components/ProductGrid"
import ProductsHeader from "@/components/ProductsHeader"
import { prisma } from "@/lib/prisma"
import { Suspense } from "react"

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function ProductsPage({
  searchParams,
}: PageProps) {
  const resolvedSearchParams = await searchParams;
  const search = typeof resolvedSearchParams.search === "string" ? resolvedSearchParams.search : undefined;
  const sort = typeof resolvedSearchParams.sort === "string" ? resolvedSearchParams.sort : undefined;

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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
