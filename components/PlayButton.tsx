"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

type PlayButtonProps = {
  movieId: string;
  className?: string;
}

const PlayButton = ({ movieId, className }: PlayButtonProps) => {
  const router = useRouter();
  const { status } = useSession();
  return (
    <>
      {status === 'authenticated' && (
        <div onClick={() => { router.push(`/watch/${movieId}`) }} className={cn("border-[1px] lg:border-2 border-white cursor-pointer lg:w-10 lg:h-10 w-6 h-6 rounded-full flex items-center justify-center hover:text-black hover:bg-white transition", className)}>
          <BsFillPlayFill className="w-4 h-4 lg:w-7 lg:h-7" />
        </div>
      )}
      {status === 'unauthenticated' && (
        <Popover>
          <PopoverTrigger className={cn("border-[1px] lg:border-2 cursor-default border-slate-400 text-slate-400 lg:w-10 lg:h-10 w-6 h-6 rounded-full flex items-center justify-center transition", className)}>
            <BsFillPlayFill className="w-3 h-3 lg:w-8 lg:h-8" />
          </PopoverTrigger>
          <PopoverContent>Sign in and start enjoying movies right now!</PopoverContent>
        </Popover>
      )}
    </>
  )
}

export default PlayButton