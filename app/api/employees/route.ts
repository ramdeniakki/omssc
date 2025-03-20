import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {


    const employees = await prisma.employee.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(employees)
  } catch (error) {
    console.error("Error fetching employees:", error)
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    )
  }
}


export async function POST(request: NextRequest) {
  try {


    const body = await request.json()
    console.log("Received employee data:", body)

    const { name, phone, position } = body


    if (!name || !phone || !position) {
      return NextResponse.json(
        { error: "Name, phone, and position are required" },
        { status: 400 }
      )
    }


    const employeeData = {
      name,
      phone,
      position,
      isActive: true,
      joinDate: new Date()
    }

    console.log("About to create employee with data:", employeeData)

    const employee = await prisma.employee.create({
      data: employeeData
    })

    console.log("Employee created successfully:", employee)
    return NextResponse.json(employee, { status: 201 })
  } catch (error) {
  
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating employee:", { error: errorMessage });

    return NextResponse.json(
      {
        error: "Failed to create employee",
        message: errorMessage
      },
      { status: 500 }
    )
  }
}
