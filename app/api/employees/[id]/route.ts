import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions)
    const resolvedParams = await params;

    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      )
    }

    const id = resolvedParams.id;

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        attendances: {
          orderBy: {
            date: "desc",
          },
        },
      },
    })

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(employee)
  } catch (error) {
    console.error("Error fetching employee:", error)
    return NextResponse.json(
      { error: "Failed to fetch employee" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions)
    const resolvedParams = await params;

    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      )
    }

    const id = resolvedParams.id
    const body = await request.json()
    const { name, phone, position, isActive } = body

    // Validate required fields
    if (!name || !phone || !position) {
      return NextResponse.json(
        { error: "Name, phone, and position are required" },
        { status: 400 }
      )
    }

    const existingEmployee = await prisma.employee.findUnique({
      where: { id },
    })

    if (!existingEmployee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      )
    }

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        name,
        phone,
        position,
        isActive: isActive !== undefined ? isActive : existingEmployee.isActive,
      },
    })

    return NextResponse.json(updatedEmployee)
  } catch (error) {
    console.error("Error updating employee:", error)
    return NextResponse.json(
      { error: "Failed to update employee" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions)
    const resolvedParams = await params;

    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      )
    }

    const id = resolvedParams.id

    const existingEmployee = await prisma.employee.findUnique({
      where: { id },
    })

    if (!existingEmployee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      )
    }

    await prisma.employee.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Employee deleted successfully" })
  } catch (error) {
    console.error("Error deleting employee:", error)
    return NextResponse.json(
      { error: "Failed to delete employee" },
      { status: 500 }
    )
  }
}
