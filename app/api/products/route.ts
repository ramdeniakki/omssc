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

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  // Fallback to constructing the URL from request headers in development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  throw new Error('NEXT_PUBLIC_APP_URL environment variable is not set');
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const model = formData.get("model") as string;
    const image = formData.get("image") as File;

    if (!name || !description || !price || !category || !model) {
      return NextResponse.json(
        { error: "All fields are required except image" },
        { status: 400 }
      );
    }

    let imageUrl = null;

    if (image) {
      try {
        const imageFormData = new FormData();
        imageFormData.append("file", image);

        const baseUrl = getBaseUrl();
        const uploadResponse = await fetch(`${baseUrl}/api/upload`, {
          method: "POST",
          body: imageFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload image: ${uploadResponse.statusText}`);
        }

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        model,
        imageUrl,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
