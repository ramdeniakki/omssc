import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      )
    }

    const resolvedParams = await params;
    const id = resolvedParams.id
    const body = await request.json()
    const { date, status, note } = body

    if (!date || !status) {
      return NextResponse.json(
        { error: "Date and status are required" },
        { status: 400 }
      )
    }

    const employee = await prisma.employee.findUnique({
      where: { id },
    })

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      )
    }

    const attendanceDate = new Date(date)

    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        employeeId: id,
        date: attendanceDate,
      },
    })

    let attendance

    if (existingAttendance) {
      attendance = await prisma.attendance.update({
        where: {
          id: existingAttendance.id,
        },
        data: {
          status,
          note,
        },
      })
    } else {
      attendance = await prisma.attendance.create({
        data: {
          employeeId: id,
          date: attendanceDate,
          status,
          note,
        },
      })
    }

    return NextResponse.json(attendance, { status: 201 })
  } catch (error) {
    console.error("Error managing attendance:", error)
    return NextResponse.json(
      { error: "Failed to manage attendance" },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      )
    }

    const resolvedParams = await params;
    const employeeId = resolvedParams.id

    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        attendances: {
          orderBy: {
            date: 'desc'
          }
        }
      }
    })

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(employee.attendances)
  } catch (error) {
    console.error("Error fetching attendance records:", error)
    return NextResponse.json(
      { error: "Failed to fetch attendance records" },
      { status: 500 }
    )
  }
}
