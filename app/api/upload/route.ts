import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      )
    }


    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)


    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`
    const path = `public/uploads/${filename}`


    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/save-file`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path,
        data: buffer.toString("base64"),
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to save file")
    }

   
    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    )
  }
}
