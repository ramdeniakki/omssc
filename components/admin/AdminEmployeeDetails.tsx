"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Attendance = {
  id: string
  date: string
  status: string
  note: string | null
}

type Employee = {
  id: string
  name: string
  phone: string
  position: string
  joinDate: string
  isActive: boolean
  attendances: Attendance[]
}

export default function AdminEmployeeDetails({ id }: { id: string }) {
  const router = useRouter()
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  ) // 1-12
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  )
  const [isCustomDateDialogOpen, setIsCustomDateDialogOpen] = useState(false)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/employees/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch employee details")
        }

        const data = await response.json()
        setEmployee(data)
      } catch (err: any) {
        setError(err.message || "Failed to fetch employee details")
        toast({
          title: "Error",
          description: "Failed to fetch employee details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [id])

  useEffect(() => {
    if (!employee) return

    const fetchAttendance = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `/api/employees/${id}/attendance?month=${selectedMonth}&year=${selectedYear}`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch attendance records")
        }

        const data: Attendance[] = await response.json()

        setEmployee((prev) => ({
          ...prev!,
          attendances: data,
        }))
      } catch (err: any) {
        toast({
          title: "Error",
          description: "Failed to fetch attendance records",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAttendance()
  }, [id, selectedMonth, selectedYear])

  const handleMarkAttendance = async (status: string) => {
    try {
      const today = new Date()

      const response = await fetch(`/api/employees/${id}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: today.toISOString(),
          status,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to mark attendance")
      }

      toast({
        title: "Success",
        description: `Attendance marked as ${status}`,
      })


      if (
        today.getMonth() + 1 === selectedMonth &&
        today.getFullYear() === selectedYear
      ) {
        const updatedAttendance = await response.json()
        setEmployee((prev) => {
          if (!prev) return prev


          const updatedAttendances = [...prev.attendances]
          const index = updatedAttendances.findIndex(
            (a) => a.id === updatedAttendance.id
          )

          if (index >= 0) {
            updatedAttendances[index] = updatedAttendance
          } else {
            updatedAttendances.unshift(updatedAttendance)
          }

          return {
            ...prev,
            attendances: updatedAttendances,
          }
        })
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to mark attendance",
        variant: "destructive",
      })
    }
  }

  const handleMarkAttendanceForDate = async (date: Date, status: string, note: string = "") => {
    try {
      setLoading(true)
      const response = await fetch(`/api/employees/${id}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date.toISOString(),
          status,
          note,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to mark attendance")
      }

      toast({
        title: "Success",
        description: `Attendance marked as ${status} for ${date.toLocaleDateString()}`,
      })


      if (
        date.getMonth() + 1 === selectedMonth &&
        date.getFullYear() === selectedYear
      ) {

        const fetchAttendance = async () => {
          const response = await fetch(
            `/api/employees/${id}/attendance?month=${selectedMonth}&year=${selectedYear}`
          )
          if (response.ok) {
            const data: Attendance[] = await response.json()
            setEmployee((prev) => ({
              ...prev!,
              attendances: data,
            }))
          }
        }
        await fetchAttendance()
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to mark attendance",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setIsCustomDateDialogOpen(false)
    }
  }

  const handleDeleteAttendance = async (attendanceId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/employees/${id}/attendance/${attendanceId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete attendance record")
      }

      toast({
        title: "Success",
        description: "Attendance record deleted successfully",
      })

    
      setEmployee((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          attendances: prev.attendances.filter((a) => a.id !== attendanceId),
        }
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to delete attendance record",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading && !employee) {
    return <div className="text-center p-8">Loading employee details...</div>
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        Error: {error}
        <div className="mt-4">
          <Button onClick={() => router.push("/admin/employees")}>
            Back to Employees
          </Button>
        </div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="text-center p-8">
        Employee not found
        <div className="mt-4">
          <Button onClick={() => router.push("/admin/employees")}>
            Back to Employees
          </Button>
        </div>
      </div>
    )
  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employee Details</h1>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/employees")}
        >
          Back to Employees
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{employee.name}</CardTitle>
          <CardDescription>Employee Information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p>{employee.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Position</p>
              <p>{employee.position}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Join Date</p>
              <p>{new Date(employee.joinDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <p>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    employee.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {employee.isActive ? "Active" : "Inactive"}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mark Today's Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Button
              onClick={() => handleMarkAttendance("present")}
              className="bg-green-600 hover:bg-green-700"
            >
              Present
            </Button>
            <Button
              onClick={() => handleMarkAttendance("absent")}
              className="bg-red-600 hover:bg-red-700"
            >
              Absent
            </Button>
            <Button
              onClick={() => handleMarkAttendance("leave")}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              Leave
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>View and manage attendance</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Dialog open={isCustomDateDialogOpen} onOpenChange={setIsCustomDateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Mark for Specific Date</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Mark Attendance for Specific Date</DialogTitle>
                </DialogHeader>
                <CustomDateAttendance onSubmit={handleMarkAttendanceForDate} />
              </DialogContent>
            </Dialog>

            <div className="flex space-x-2">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="border rounded p-1"
              >
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="border rounded p-1"
              >
                {Array.from(
                  { length: 5 },
                  (_, i) => new Date().getFullYear() - 2 + i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center p-4">Loading attendance records...</div>
          ) : employee.attendances.length === 0 ? (
            <div className="text-center p-4">No attendance records found.</div>
          ) : (
            <Table>
              <TableCaption>
                Attendance for {months[selectedMonth - 1]} {selectedYear}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employee.attendances.map((attendance) => (
                  <TableRow key={attendance.id}>
                    <TableCell>
                      {new Date(attendance.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          attendance.status === "present"
                            ? "bg-green-100 text-green-800"
                            : attendance.status === "absent"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {attendance.status.charAt(0).toUpperCase() +
                          attendance.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{attendance.note || "-"}</TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-100">
                            <Trash2 size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the attendance record from {new Date(attendance.date).toLocaleDateString()}.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteAttendance(attendance.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function CustomDateAttendance({
  onSubmit
}: {
  onSubmit: (date: Date, status: string, note: string) => Promise<void>
}) {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [status, setStatus] = useState<string>("present")
  const [note, setNote] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(new Date(date), status, note)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="present">Present</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
            <SelectItem value="leave">Leave</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="note">Note (Optional)</Label>
        <Input
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Mark Attendance</Button>
      </div>
    </form>
  )
}
