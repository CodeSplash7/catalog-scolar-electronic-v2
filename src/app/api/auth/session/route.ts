import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import options, { CustomSession } from "../[...nextauth]/options";

export async function GET() {
  try {
    const session = (await getServerSession(options)) as CustomSession;

    if (!session) {
      console.error("Session is undefined or not found");
      return NextResponse.json(
        { message: "Unauthorized: No session found" },
        { status: 401 }
      );
    }

    if (!session.user?.id) {
      console.error("Session is missing `id`: ", session);
      return NextResponse.json(
        { message: "Invalid session: Missing `id`" },
        { status: 500 }
      );
    }

    // Return a valid JSON response
    return NextResponse.json({
      ...session,
      user: {
        ...session.user,
        id: session.user.id // Explicitly include `id`
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in /api/auth/session handler:", error);
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    }
  }
}
