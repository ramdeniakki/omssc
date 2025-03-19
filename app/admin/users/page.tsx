import AdminUsersList from "@/components/admin/AdminUsersList"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user.isAdmin) {
    redirect("/auth/signin")
  }

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      name: true,
      email: true,
      isAdmin: true,
      createdAt: true,
    }
  })

  return <AdminUsersList users={users} />
}
