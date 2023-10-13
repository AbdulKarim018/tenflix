import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { getCurrentUserFromDB } from "@/lib/utils/getCurrentUserFromDB";

export const revalidate = 0;
export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Not logged in!" });
  const currentUser = await getCurrentUserFromDB(req);
  return NextResponse.json(currentUser);
};