import AdminProductForm from "@/components/admin/AdminProductForm"
import { authOptions } from "@/lib/auth"
import { getProductById } from "@/lib/products"
import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation"

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user.isAdmin) {
    redirect("/auth/signin")
  }

  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return <AdminProductForm product={product} />
}
