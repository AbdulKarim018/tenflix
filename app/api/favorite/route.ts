import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import authOptions from "../auth/[...nextauth]/options"
import prisma from "@/lib/prismadb";
import { without } from "lodash";
import { getCurrentUserFromDB } from "@/lib/utils/getCurrentUserFromDB";

export const revalidate = 0;
export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Not logged in!" }, { status: 401 })
  const currentUser = await getCurrentUserFromDB(req);
  const favoriteMovies = await prisma.movie.findMany({
    where: {
      id: {
        in: currentUser?.favoriteIds || [],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(favoriteMovies);
};

export const POST = async (req: Request) => {
  const { movieId } = await req.json();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Not logged in!" }, { status: 401 })

  const currentUser = await getCurrentUserFromDB(req);
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
      email: currentUser?.email || "",
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
  if (!session) return NextResponse.json({ error: "Not logged in!" }, { status: 401 })

  const existingMovie = await prisma.movie.findUnique({
    where: {
      id: movieId
    }
  });
  if (!existingMovie) {
    return NextResponse.json({ error: "Movie not found!" }, { status: 404 });
  }

  const currentUser = await getCurrentUserFromDB(req);
  const updatedFavoriteIds = without(currentUser?.favoriteIds, movieId);
  const updatedUser = await prisma.user.update({
    where: {
      email: currentUser?.email || "",
    },
    data: {
      favoriteIds: {
        set: updatedFavoriteIds,
      }
    },
  });
  console.log(updatedFavoriteIds);

  return NextResponse.json(updatedFavoriteIds);
}