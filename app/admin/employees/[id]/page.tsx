import AdminEmployeeDetails from "@/components/admin/AdminEmployeeDetails";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EmployeeDetailsPage({
  params
}: PageProps) {
  return <AdminEmployeeDetails id={params.id} />
}
