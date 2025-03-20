import AdminEmployeeDetails from "@/components/admin/AdminEmployeeDetails";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EmployeeDetailsPage({
  params,
}: PageProps) {
  const resolvedParams = await params;
  return <AdminEmployeeDetails id={resolvedParams.id} />
}
