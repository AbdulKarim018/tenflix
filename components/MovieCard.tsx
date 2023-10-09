"use client"
import { Movie } from '@prisma/client'
import React from 'react'
import { BsFillBookmarkPlusFill, BsFillPlayFill } from 'react-icons/bs'

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="group rounded-md shadow-lg
           bg-slate-900/20 backdrop:bg-black
           transition relative
           "
      key={movie.id}>
      <img src={movie.thumbnailUrl} alt={movie.title}
        className='w-[50vw] h-[32vw] lg:h-[12vw]
         object-cover
         transition duration-300
         cursor-pointer
         group-hover:opacity-0
         ' />
      <div className="
        absolute transition bg-slate-700
        rounded-md overflow-hidden cursor-pointer
        lg:-translate-y-[15vw] -translate-y-[38vw]
        scale-0 group-hover:scale-100 duration-300
        lg:h-[15vw] h-[38vw] w-full
        ">
        <img src={movie.thumbnailUrl} alt={movie.title} className="
        lg:h-[8vw] h-[20vw] w-full object-cover
        " />
        <div className="flex justify-between">
          <p className='font-semibold text-xs lg:text-base p-1 lg:p-2 pointer-events-none'>{movie.title}</p>
          <div className="flex gap-1 p-1">
            <div className="
          border-2 border-white lg:w-10 lg:h-10 w-6 h-6 rounded-full flex items-center justify-center hover:text-black hover:bg-white transition
          "><BsFillBookmarkPlusFill className="w-3 h-3 lg:w-4 lg:h-4" /></div>
            <div className="
          border-2 border-white lg:w-10 lg:h-10 w-6 h-6 rounded-full flex items-center justify-center hover:text-black hover:bg-white transition
          "><BsFillPlayFill className="w-3 h-3 lg:w-4 lg:h-4" /></div>
          </div>
        </div>
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