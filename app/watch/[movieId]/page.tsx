import authOptions from "@/app/api/auth/[...nextauth]/options";
import BackButton from "@/components/BackButton";
import MoviePlayer from "@/components/MoviePlayer";
import Navbar from "@/components/Navbar"
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const MoviePage = async ({ params }: { params: { movieId: string } }) => {
  const session = getServerSession(authOptions);
  if (!session) return redirect('/login');
  const { movieId } = params;
  if (!movieId) return null;

  const movie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  });

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-16">
        <div className="bg-black/70 w-full h-32 flex items-center gap-3">
          <BackButton />
          <h2 className="font-bold text-2xl text-whtie">{movie?.title}</h2>
        </div>
        <MoviePlayer movieId={movieId} />
      </main>
    </>
  )
}

export default MoviePage