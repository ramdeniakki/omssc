import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const response = NextResponse.json(product)
    response.headers.set("Cache-Control", "no-store, must-revalidate")
    response.headers.set("Pragma", "no-cache")
    response.headers.set("Expires", "0")
    return response
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Error fetching product" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()

    const image = formData.get("image") as File
    let imageUrl = undefined

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

    const product = await prisma.product.update({
      where: {
        id: params.id,
      },
      data: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: parseFloat(formData.get("price") as string),
        category: formData.get("category") as "sports" | "electric" | "kids",
        model: formData.get("model") as string,
        ...(imageUrl && { imageUrl }),
      },
    })

    // Revalidate all product-related pages
    revalidatePath("/products")
    revalidatePath("/products/[id]")
    revalidatePath("/")
    revalidatePath("/categories/[category]")

    const response = NextResponse.json(product)
    response.headers.set("Cache-Control", "no-store, must-revalidate")
    response.headers.set("Pragma", "no-cache")
    response.headers.set("Expires", "0")
    return response
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Error updating product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await prisma.product.delete({
      where: {
        id: params.id,
      },
    })

    // Revalidate all product-related pages
    revalidatePath("/products")
    revalidatePath("/products/[id]")
    revalidatePath("/")
    revalidatePath("/categories/[category]")

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Error deleting product" }, { status: 500 })
  }
}
