import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {

    const session = await getServerSession(authOptions);

    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized. Only admins can view user details." },
        { status: 403 }
      );
    }

    const userId = params.id.toString();


    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    return NextResponse.json(
      { error: "Failed to retrieve user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {

    const session = await getServerSession(authOptions);

    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized. Only admins can delete users." },
        { status: 403 }
      );
    }

    const userId = params.id.toString();
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Prevent self-deletion (current user can't delete themselves)
    if (user.id === session.user.id) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 }
      );
    }

   
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
