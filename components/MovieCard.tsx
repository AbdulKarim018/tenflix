"use client"
import { Movie } from '@prisma/client'
import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import FavoriteButton from './FavoriteButton'

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="group rounded-md shadow-lg
           bg-slate-900/20 backdrop:bg-black
           transition relative
           w-full lg:w-[18rem] h-[32vw] lg:h-[12vw]
           "
      key={movie.id}>
      <img src={movie.thumbnailUrl} alt={movie.title}
        className='w-[50vw] h-[32vw] lg:h-[12vw]
         object-cover
         transition duration-300
         group-hover:opacity-0
         ' />
      <div className="
        absolute bg-slate-700
        rounded-md overflow-hidden transition
        lg:-translate-y-[18vw] -translate-y-[44vw]
        scale-0 group-hover:scale-100 duration-300
        lg:h-[18vw] h-[44vw] w-full
        ">
        <img src={movie.thumbnailUrl} alt={movie.title} className="
        lg:h-[8vw] h-[20vw] w-full object-cover
        " />
        <div className="flex justify-between">
          <p className='font-semibold text-sm lg:text-lg p-1 line-clamp-2 pointer-events-none'>{movie.title}</p>
          <div className="flex gap-1 p-1">
            <FavoriteButton movieId={movie.id} />
            <div className="
          border-[1px] lg:border-2 border-white lg:w-10 lg:h-10 w-6 h-6 rounded-full flex items-center justify-center hover:text-black hover:bg-white transition
          "><BsFillPlayFill className="w-4 h-4 lg:w-7 lg:h-7" /></div>
          </div>
        </div>
        <p className="text-green-400 text-xs lg:text-base p-1 leading-3 pointer-events-none">{movie.genre}</p>
        <p className="text-green-400 text-xs lg:text-base p-1 leading-3 pointer-events-none">{movie.duration}</p>
      </div>
    </div>
  )
}

export default MovieCard





{/* <div className="absolute transition bg-black
lg:-translate-y-[12vw] -translate-y-[32vw]
 opacity-0 group-hover:opacity-80 duration-300
 h-full w-full
 flex flex-col justify-between
 ">
</div> */}

{/* <h3 className="text-white text-sm lg:text-lg font-semibold pointer-events-none p-1">{movie.title}</h3>
<div className='w-full flex justify-end gap-2 p-1'>
  <Button variant={'ghost'} size={'icon'} ><BsFillBookmarkPlusFill className="w-5 h-5" /></Button>
  <Button variant={'ghost'} size={'icon'} ><FaPlay className="w-5 h-5" />Play</Button>
</div> */}