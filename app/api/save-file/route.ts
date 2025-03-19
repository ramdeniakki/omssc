import { writeFile } from "fs/promises"
import { NextResponse } from "next/server"
import { join } from "path"

export async function POST(request: Request) {
  try {
    const { path, data } = await request.json()


    const buffer = Buffer.from(data, "base64")


    const fullPath = join(process.cwd(), path)

    
    await writeFile(fullPath, buffer)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving file:", error)
    return NextResponse.json(
      { error: "Error saving file" },
      { status: 500 }
    )
  }
}
