import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getAllUsers } from "@/lib/users"
import { hash } from "bcryptjs"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const users = await getAllUsers()

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {

    const session = await getServerSession(authOptions)

    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized. Only admins can add users." },
        { status: 403 }
      )
    }


    const { name, email, password, isAdmin } = await req.json()


    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }


    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      )
    }


    const hashedPassword = await hash(password, 10)


    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin === undefined ? false : isAdmin,
      },
    })

    
    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    )
  }
}
