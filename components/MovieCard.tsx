"use client"
import { Movie } from '@prisma/client'
import React from 'react'

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="group rounded-md shadow-lg
           bg-slate-900/20 backdrop:bg-black
           transition
           "
      key={movie.id}>
      <img src={movie.thumbnailUrl} alt={movie.title}
        width={300} height={300}
        className='w-[50vw] h-[32vw] lg:h-[12vw]
         object-cover
         transition
         cursor-pointer
         ' />
      <div className="
absolute
">
      </div>
    </div>
  )
}

export default MovieCard