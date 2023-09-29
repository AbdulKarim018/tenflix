import prismadb from '@/lib/prismadb';
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  const movies = await prismadb.movie.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 6,
  });

  return NextResponse.json(movies);
}