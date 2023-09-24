"use client"

import useAllMoviesFetcher from '@/hooks/useAllMoviesFetcher'
import { Movie } from '@prisma/client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

const MovieList = () => {

  const { data: movies, error, isLoading }: { data: Movie[], error: any, isLoading: boolean, } = useAllMoviesFetcher();

  return (
    <div className='p-4'>
      <h2 className='text-2xl text-bold py-5 px-4 font-bold'>
        New on <span className='font-semibold text-red-700'>TENFLIX</span>
      </h2>
      {isLoading && <div className='animate-none flex justify-center w-full h-56 mt-6'><AiOutlineLoading className='animate-spin w-12 h-12' /></div>}
      {movies && <div className="lg:flex grid grid-cols-2 gap-2 col">
        {movies?.map((movie) => (
          <div className="rounded-md overflow-hidden shadow-lg
           bg-slate-900/20 backdrop:bg-black"
            key={movie.id}>
            <Image src={movie.thumbnailUrl} alt={movie.title}
              width={300} height={300}
              className='lg:w-[20rem] lg:h-[10rem] w-[60vw] h-[10rem] object-cover' />
          </div>
        ))}
      </div>}
    </div>
  )
}

export default MovieList