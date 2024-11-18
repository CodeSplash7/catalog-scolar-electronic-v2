import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import options, { CustomSession } from "../[...nextauth]/options";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = (await getServerSession(
      req,
      res,
      options
    )) as CustomSession;

    if (!session) {
      console.error("Session is undefined or not found");
      return res
        .status(401)
        .json({ message: "Unauthorized: No session found" });
    }

    if (!session.user?.id) {
      console.error("Session is missing `id`: ", session);
      return res.status(500).json({ message: "Invalid session: Missing `id`" });
    }

    // Send a valid JSON response
    res.status(200).json({
      ...session,
      user: {
        ...session.user,
        id: session.user.id // Explicitly include `id`
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in /api/auth/session handler:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
}
