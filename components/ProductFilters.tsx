"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { formatPrice } from "@/lib/currency"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 75000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    // Add price range
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    // Add categories
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","))
    } else {
      params.delete("categories")
    }

    router.push(`?${params.toString()}`)
  }

  const resetFilters = () => {
    setPriceRange([0, 75000])
    setSelectedCategories([])
    router.push("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>

      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[0, 75000]} max={75000} step={1000} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex items-center justify-between">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["sports", "electric", "kids"].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={applyFilters} className="w-full">
        Apply Filters
      </Button>
    </div>
  )
}
