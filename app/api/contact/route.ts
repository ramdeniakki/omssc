import { getTimeRemaining, rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EmailError extends Error {
  code?: string;
  response?: string;
  responseCode?: number;
  command?: string;
}

// Rate limit
const RATE_LIMIT_CONFIG = {
  max: 10,
  timeWindow: 3 * 60 * 60 * 1000,
};

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, message } = body

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }


    const ip = req.headers.get("x-forwarded-for") || "anonymous"


    const identifier = `${ip}:${email}`;
    const rateLimitResult = rateLimit(identifier, RATE_LIMIT_CONFIG);

    if (!rateLimitResult.success) {
      const timeRemaining = getTimeRemaining(rateLimitResult.resetTime);
      return NextResponse.json(
        {
          error: `Rate limit exceeded. You can send ${RATE_LIMIT_CONFIG.max} messages every 3 hours. Please try again in ${timeRemaining}.`
        },
        { status: 429 }
      );
    }


    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASSWORD
    const emailTo = process.env.EMAIL_TO || "workingwithakki@gmail.com"

    if (!emailUser || !emailPass) {
      console.warn("Email configuration not set up. Form data:", { name, email, phone, message })
      return NextResponse.json(
        { message: "Message received (email not sent - configuration incomplete)" },
        { status: 200 }
      )
    }


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    try {

      await transporter.sendMail({
        from: emailUser,
        to: emailTo,
        subject: `New Contact Form Submission from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Message: ${message}
        `,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      })

      return NextResponse.json(
        {
          message: "Message sent successfully",
          remaining: rateLimitResult.remaining,
          limit: rateLimitResult.limit
        },
        { status: 200 }
      )
    } catch (error) {
      console.error("Email sending error:", error)


      const emailError = error as EmailError


      if (emailError.code === 'EAUTH') {
        return NextResponse.json(
          {
            error: "Email authentication failed. If using Gmail, you need to use an App Password. Generate one at: https://myaccount.google.com/apppasswords"
          },
          { status: 500 }
        )
      }

     
      return NextResponse.json(
        { error: "Failed to send email. Please check your email configuration." },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}
