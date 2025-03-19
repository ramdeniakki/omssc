"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductsHeader({
  title,
  count,
}: {
  title: string
  count: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || "newest")

  const handleSortChange = (value: string) => {
    setSortOption(value)

    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{count} products</p>
      </div>

      <div className="mt-4 sm:mt-0">
        <Select value={sortOption} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

