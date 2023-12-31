import prismadb from '@/lib/prismadb';
import { NextResponse } from "next/server"

export const revalidate = 300;
export const GET = async (req: Request) => {
  const movies = await prismadb.movie.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 6,
  });

  return NextResponse.json(movies);
}