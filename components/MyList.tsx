"use client"

import { Movie } from '@prisma/client'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { AiOutlineLoading } from 'react-icons/ai'
import MovieCard from './MovieCard'
import useFavorites from '@/hooks/useFavorites'
import { useSession } from 'next-auth/react'
import { FaLock } from 'react-icons/fa'

const MyList = () => {

  const { status } = useSession();

  const { data: favorites, error, isLoading }: { data: Movie[], error: any, isLoading: boolean } = useFavorites();
  // console.log(favorites);

  return (
    <>
      <Toaster />
      <section className='p-4'>
        <h2 className='text-2xl text-bold py-5 px-4 font-bold pointer-events-none'>
          My List
        </h2>
        {isLoading && status === 'loading' && <div className='animate-none flex justify-center w-full h-56 mt-6'><AiOutlineLoading className='animate-spin w-12 h-12 duration-500' /></div>}
        {error && toast.error('An Error Occured while fetching favorites!', { duration: 2000 })}
        {favorites && favorites.length > 0 && status === 'authenticated' && <div className="lg:flex grid grid-cols-2 gap-2 col">
          {favorites?.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>}
        {favorites && favorites.length === 0 && status === 'authenticated' && <div className='flex justify-center items-center h-56'>
          <p className='text-2xl font-semibold text-gray-400'>No Favorites Yet!</p>
        </div>}
        {status === 'unauthenticated' && <div className='flex flex-col justify-center gap-1 items-center h-56'>
          <FaLock className="text-gray-400" size={50} />
          <p className='text-2xl font-semibold text-gray-400'>Login to see your favorites!</p>
        </div>}
      </section>
    </>
  )
}

export default MyList