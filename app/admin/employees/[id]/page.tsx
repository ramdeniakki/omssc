import AdminEmployeeDetails from "@/components/admin/AdminEmployeeDetails";

export default async function EmployeeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <AdminEmployeeDetails id={params.id} />
}
