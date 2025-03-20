import { prisma } from "@/lib/prisma"
import type { Product } from "@/lib/types"

type ProductFilters = {
  search?: string
  sort?: string
  minPrice?: string
  maxPrice?: string
  categories?: string
  category?: string
}

export async function getAllProducts(filters: ProductFilters): Promise<Product[]> {
  const { search, sort, minPrice, maxPrice, categories } = filters

  let orderBy = {}
  if (sort) {
    switch (sort) {
      case "price-asc":
        orderBy = { price: "asc" }
        break
      case "price-desc":
        orderBy = { price: "desc" }
        break
      case "name-asc":
        orderBy = { name: "asc" }
        break
      case "name-desc":
        orderBy = { name: "desc" }
        break
      default:
        orderBy = { createdAt: "desc" }
    }
  } else {
    orderBy = { createdAt: "desc" }
  }

  const where: any = {}

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { model: { contains: search, mode: "insensitive" } },
    ]
  }

  if (minPrice || maxPrice) {
    where.price = {}
    if (minPrice) where.price.gte = Number.parseFloat(minPrice)
    if (maxPrice) where.price.lte = Number.parseFloat(maxPrice)
  }

  if (categories) {
    const categoryList = categories.split(",")
    where.category = { in: categoryList }
  }

  try {
    const products = await prisma.product.findMany({
      where,
      orderBy,
    })

    return products
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return []
  }
}

export async function getProductsByCategory(category: string, filters: ProductFilters): Promise<Product[]> {
  const { search, sort } = filters

  let orderBy = {}
  if (sort) {
    switch (sort) {
      case "price-asc":
        orderBy = { price: "asc" }
        break
      case "price-desc":
        orderBy = { price: "desc" }
        break
      case "name-asc":
        orderBy = { name: "asc" }
        break
      case "name-desc":
        orderBy = { name: "desc" }
        break
      default:
        orderBy = { createdAt: "desc" }
    }
  } else {
    orderBy = { createdAt: "desc" }
  }

  const where: any = {
    category,
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { model: { contains: search, mode: "insensitive" } },
    ]
  }

  try {
    const products = await prisma.product.findMany({
      where,
      orderBy,
    })

    return products
  } catch (error) {
    console.error(`Failed to fetch ${category} products:`, error)
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    })

    return product
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error)
    return null
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        featured: true,
      },
      take: 8,
    })

    if (products.length === 0) {
      // If no featured products, return the latest products
      return await prisma.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 8,
      })
    }

    return products
  } catch (error) {
    console.error("Failed to fetch featured products:", error instanceof Error ? error.message : error)
    return []
  }
}

export async function getRelatedProducts(productId: string, category: string): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        category,
        id: {
          not: productId,
        },
      },
      take: 4,
    })

    return products
  } catch (error) {
    console.error("Failed to fetch related products:", error)
    return []
  }
}
