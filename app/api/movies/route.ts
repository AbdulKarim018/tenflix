import prismadb from '@/lib/prismadb';
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {


  const movies = await prismadb.movie.findMany({
    orderBy: {
      createdAt: 'desc',
    }
  });

  return NextResponse.json(movies);
}