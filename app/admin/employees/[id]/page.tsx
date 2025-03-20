import AdminEmployeeDetails from "@/components/admin/AdminEmployeeDetails";

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function EmployeeDetailsPage({
  params
}: PageProps) {

  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;

  return <AdminEmployeeDetails id={id} />
}
