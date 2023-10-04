"use client"

import useLatestMovies from '@/hooks/useLatestMovies'
import { Movie } from '@prisma/client'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { AiOutlineLoading } from 'react-icons/ai'
import MovieCard from './MovieCard'

const MovieList = () => {

  const { data: movies, error, isLoading }: { data: Movie[], error: any, isLoading: boolean, } = useLatestMovies();

  return (
    <>
      <Toaster />
      <section className='p-4'>
        <h2 className='text-2xl text-bold py-5 px-4 font-bold cursor-default'>
          New on <span className='font-semibold text-red-700'>TENFLIX</span>
        </h2>
        {isLoading && <div className='animate-none flex justify-center w-full h-56 mt-6'><AiOutlineLoading className='animate-spin w-12 h-12 duration-500' /></div>}
        {error && toast.error('An Error Occured while fetching movies!', { duration: 2000 })}
        {movies && <div className="lg:flex grid grid-cols-2 gap-2 col">
          {movies?.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>}
      </section>
    </>
  )
}

export default MovieList