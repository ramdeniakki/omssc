import AdminProductForm from "@/components/admin/AdminProductForm"
import { authOptions } from "@/lib/auth"
import { getProductById } from "@/lib/products"
import { getServerSession } from "next-auth"
import { notFound, redirect } from "next/navigation"

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user.isAdmin) {
    redirect("/auth/signin")
  }

  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id)

  if (!product) {
    notFound()
  }

  return <AdminProductForm product={product} />
}
