import AdminProductList from "@/components/admin/AdminProductList"
import { authOptions } from "@/lib/auth"
import { getAllProducts } from "@/lib/products"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user.isAdmin) {
    redirect("/auth/signin")
  }

  const products = await getAllProducts({})

  return <AdminProductList products={products} />
}
