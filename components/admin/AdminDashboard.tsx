"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { formatPrice } from "@/lib/currency"
import { BarChart, DollarSign, LogOut, Package, Users } from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {

      await signOut({
        redirect: false,
        callbackUrl: "/auth/signin"
      })


      toast({
        title: "Signed out successfully",
        description: "You have been signed out of the admin dashboard.",
        variant: "success",
        duration: 10000,
      })


      router.push("/auth/signin")
      router.refresh() 
    } catch (error) {
      console.error("Error signing out:", error)
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/admin/products/new">Add New Product</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/admin/users">Manage Users</Link>
          </Button>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">+15 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(12345)}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">-2 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="users">Admins</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Products Management</CardTitle>
              <CardDescription>
                Manage your product inventory, add new products, or update existing ones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <Button asChild>
                  <Link href="/admin/products">View All Products</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/admin/products/new">Add New Product</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders Management</CardTitle>
              <CardDescription>View and manage customer orders, track shipments, and process returns.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Order management features coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>View customer information, purchase history, and manage accounts.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Customer management features coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Admin Users Management</CardTitle>
              <CardDescription>Add or manage admin users for the dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <Button asChild>
                  <Link href="/admin/users">Manage Admin Users</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/admin/users/new">Add New Admin</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
