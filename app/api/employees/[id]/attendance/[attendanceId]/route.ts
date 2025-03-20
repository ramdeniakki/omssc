import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; attendanceId: string } }
) {
  try {
    const session = await getServerSession(authOptions)


    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      )
    }

    const employeeId = params.id
    const attendanceId = params.attendanceId


    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    })

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      )
    }


    const attendance = await prisma.attendance.findFirst({
      where: {
        id: attendanceId,
        employeeId: employeeId
      },
    })

    if (!attendance) {
      return NextResponse.json(
        { error: "Attendance record not found" },
        { status: 404 }
      )
    }

   
    await prisma.attendance.delete({
      where: { id: attendanceId },
    })

    return NextResponse.json(
      { message: "Attendance record deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting attendance record:", error)
    return NextResponse.json(
      { error: "Failed to delete attendance record" },
      { status: 500 }
    )
  }
}
