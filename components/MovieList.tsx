"use client"

import { Movie } from '@prisma/client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const MovieList = () => {
  const moviesFetcher = async () => {
    const response = await fetch('/api/movies', {
      next: { revalidate: 3600 }
    });
    const data = await response.json();
    setMovies(data);
  }

  useEffect(() => {
    moviesFetcher();

    return () => {
      moviesFetcher();
    }
  }, [])



  const [movies, setMovies] = useState<Movie[]>([])
  return (
    <div className=''>
      <h2 className='text-2xl text-bold py-5 px-4 font-bold'>
        New on <span className='font-semibold text-red-700'>TENFLIX</span>
      </h2>
      <div className="lg:flex grid grid-cols-2 gap-2 col">
        {movies?.map((movie) => (
          <div className="rounded-md overflow-hidden shadow-lg
           bg-slate-900/20 backdrop:bg-black"
            key={movie.id}>
            <Image src={movie.thumbnailUrl} alt={movie.title}
              width={300} height={300}
              className='lg:w-[20rem] lg:h-[10rem] w-[60vw] h-[10rem] object-cover' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieList