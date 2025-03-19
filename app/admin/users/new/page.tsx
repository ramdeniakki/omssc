import AdminUserForm from "@/components/admin/AdminUserForm"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function NewAdminUserPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user.isAdmin) {
    redirect("/auth/signin")
  }

  return <AdminUserForm />
}
