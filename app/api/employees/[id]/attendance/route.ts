import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"


export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)


    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      )
    }

    const id = params.id
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
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)


    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      )
    }

    const id = params.id
    const { searchParams } = new URL(request.url)
    const month = searchParams.get("month")
    const year = searchParams.get("year")


    const employee = await prisma.employee.findUnique({
      where: { id },
    })

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      )
    }

    let startDate, endDate

    if (month && year) {

      const monthInt = parseInt(month)
      const yearInt = parseInt(year)
      startDate = new Date(yearInt, monthInt - 1, 1)
      endDate = new Date(yearInt, monthInt, 0)
    } else {
      
      const now = new Date()
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    }

    const attendances = await prisma.attendance.findMany({
      where: {
        employeeId: id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: "desc",
      },
    })

    return NextResponse.json(attendances)
  } catch (error) {
    console.error("Error fetching attendance:", error)
    return NextResponse.json(
      { error: "Failed to fetch attendance" },
      { status: 500 }
    )
  }
}
