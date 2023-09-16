import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';


export async function GET(req: Request) {

  const movieCount = await prismadb.movie.count();

  const randomMovieNumber = Math.floor(Math.random() * movieCount);

  const randomMovie = await prismadb.movie.findMany({
    take: 1,
    skip: randomMovieNumber,
  })

  console.log("Route Accessed!");

  return NextResponse.json(randomMovie[0]);
}