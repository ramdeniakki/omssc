import { prisma } from "./prisma"

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    })
    return user
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return users
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    })
    return user
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}
