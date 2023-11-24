"use client"

import { useMovie } from "@/hooks/useMovie";


const MoviePlayer = ({ movieId }: { movieId: string }) => {
  const { data: movie } = useMovie(movieId);
  return (
    <>
      <div className="w-full lg:h-[70vh] h-[40vh]">
        <video
          className="w-full h-full"
          src={movie?.videoUrl}
          controls
          autoPlay
        />
      </div>
    </>
  )
}

export default MoviePlayer