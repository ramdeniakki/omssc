import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Log the configuration (without secrets) to help debug
console.log("Cloudinary Configuration:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key_length: process.env.CLOUDINARY_API_KEY?.length,
  api_secret_exists: !!process.env.CLOUDINARY_API_SECRET
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  try {
    // Verify Cloudinary configuration is working
    try {
      await new Promise((resolve, reject) => {
        cloudinary.api.ping((error, result) => {
          if (error) reject(error)
          else resolve(result)
        })
      })
      console.log("Cloudinary connection verified successfully")
    } catch (error) {
      console.error("Cloudinary configuration error:", error)
      return NextResponse.json(
        { error: "Invalid Cloudinary configuration" },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      )
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`

    // Upload to Cloudinary using upload API
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(base64String, {
        folder: "bicycle-store",
      }, (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error)
          reject(error)
        } else resolve(result)
      })
    })

    return NextResponse.json({
      success: true,
      url: (uploadResponse as any).secure_url,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error uploading file" },
      { status: 500 }
    )
  }
}
