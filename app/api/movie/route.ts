import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/[...nextauth]/options";
import prisma from "@/lib/prismadb";

// export const revalidate = 0;
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const movieId = searchParams.get("movieId") as string;

  if (!movieId) return NextResponse.json({ error: "Missing movieId!" }, { status: 400 });
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Not logged in!" }, { status: 401 })

  const existingMovie = await prisma.movie.findUnique({
    where: {
      id: movieId
    }
  });
  if (!existingMovie) {
    return NextResponse.json({ error: "Movie not found!" }, { status: 404 });
  }

  return NextResponse.json(existingMovie);
}