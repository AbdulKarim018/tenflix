"use client"
import { Movie } from '@prisma/client'
import React from 'react'
import { Button } from './ui/button'
import { BsFillBookmarkPlusFill } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="group rounded-md shadow-lg
           bg-slate-900/20 backdrop:bg-black
           transition relative
           "
      key={movie.id}>
      <img src={movie.thumbnailUrl} alt={movie.title}
        width={300} height={300}
        className='w-[50vw] h-[32vw] lg:h-[12vw]
         object-cover
         transition
         cursor-pointer
         ' />
      <div className="absolute transition bg-black
       lg:-translate-y-[12vw] -translate-y-[32vw]
        opacity-0 group-hover:opacity-80 duration-300
        h-full w-full
        flex flex-col justify-between
        ">
        <h3 className="text-white text-sm lg:text-lg font-semibold pointer-events-none p-1">{movie.title}</h3>
        <div className='w-full flex justify-end gap-2 p-1'>
          <Button variant={'ghost'} size={'icon'} ><BsFillBookmarkPlusFill className="w-5 h-5" /></Button>
          <Button variant={'ghost'} size={'icon'} ><FaPlay className="w-5 h-5" /></Button>
        </div>
      </div>
    </div>
  )
}

export default MovieCard