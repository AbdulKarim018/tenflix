import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'
import { Movie, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React, { useCallback, useMemo } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { KeyedMutator } from 'swr'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"



type FavoriteButtonProps = {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { status } = useSession();
  const { data: favoriteMovies, mutate: mutateFavorites }: { data: Movie[], mutate: KeyedMutator<any> } = useFavorites();
  const { data: currentUser, mutate: mutateCurrentUser }: { data: User, mutate: KeyedMutator<any> } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser?.favoriteIds, movieId]);

  const toggleFavorite = useCallback(async () => {
    const res = await fetch('/api/favorite', {
      method: isFavorite ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movieId })
    });
    mutateCurrentUser();
    mutateFavorites();
  }, [isFavorite, movieId, mutateCurrentUser, mutateFavorites])

  return (
    <>
      {status === 'authenticated' && <div onClick={toggleFavorite} className="border-[1px] lg:border-2 cursor-pointer border-white lg:w-10 lg:h-10 w-6 h-6 rounded-full flex items-center justify-center hover:text-black hover:bg-white transition">
        {isFavorite ? <AiOutlineMinus className="w-3 h-3 lg:w-8 lg:h-8" /> : <AiOutlinePlus className="w-3 h-3 lg:w-8 lg:h-8" />}
      </div>}
      {status === 'unauthenticated' && (
        <Popover>
          <PopoverTrigger className="group border-[1px] lg:border-2 cursor-default border-slate-400 text-slate-400 lg:w-10 lg:h-10 w-6 h-6 rounded-full flex items-center justify-center transition">
            <AiOutlinePlus className="w-3 h-3 lg:w-8 lg:h-8" />
          </PopoverTrigger>
          <PopoverContent>Login to add Movies To your List.</PopoverContent>
        </Popover>
      )}
    </>
  )
}

export default FavoriteButton;