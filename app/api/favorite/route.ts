import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import authOptions from "../auth/[...nextauth]/options"
import prisma from "@/lib/prismadb";
import { without } from "lodash";

export const revalidate = 0;

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const favorites = await prisma.movie.findMany({
    where: {
      id: {
        in: session?.user?.favoriteIds,
      }
    }
  });
  return NextResponse.json(favorites);
};

export const POST = async (req: Request) => {
  const { movieId } = await req.json();
  const session = await getServerSession(authOptions);

  const existingMovie = await prisma.movie.findUnique({
    where: {
      id: movieId
    }
  });
  if (!existingMovie) {
    return NextResponse.json({ error: "Movie not found!" }, { status: 404 });
  }

  const newFavorite = await prisma.user.update({
    where: {
      email: session?.user?.email || "",
    },
    data: {
      favoriteIds: {
        push: movieId,
      }
    }
  });

  return NextResponse.json(existingMovie);
};

export const DELETE = async (req: Request) => {
  const { movieId } = await req.json();
  const session = await getServerSession(authOptions);

  const existingMovie = await prisma.movie.findUnique({
    where: {
      id: movieId
    }
  });
  if (!existingMovie) {
    return NextResponse.json({ error: "Movie not found!" }, { status: 404 });
  }
  const updatedFavoriteIds = without(session?.user?.favoriteIds, movieId);
  const updatedUser = await prisma.user.update({
    where: {
      email: session?.user?.email || "",
    },
    data: {
      favoriteIds: {
        set: updatedFavoriteIds,
      }
    },
  });

  return NextResponse.json(updatedUser);
}