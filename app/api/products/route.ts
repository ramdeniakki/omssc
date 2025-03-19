import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const sort = searchParams.get("sort")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const categories = searchParams.get("categories")

    let where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { model: { contains: search, mode: "insensitive" } },
      ]
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    if (categories) {
      where.category = { in: categories.split(",") }
    }

    let orderBy: any = { createdAt: "desc" }
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
      }
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()

    // Handle image upload first
    const image = formData.get("image") as File
    let imageUrl = null

    if (image) {
      const imageFormData = new FormData()
      imageFormData.append("file", image)

      const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/upload`, {
        method: "POST",
        body: imageFormData,
      })

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image")
      }

      const { url } = await uploadResponse.json()
      imageUrl = url
    }

    // Create product with image URL
    const product = await prisma.product.create({
      data: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: parseFloat(formData.get("price") as string),
        category: formData.get("category") as "sports" | "electric" | "kids",
        model: formData.get("model") as string,
        imageUrl,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    )
  }
}
