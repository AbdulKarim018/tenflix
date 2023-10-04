"use client"

import { Montserrat } from 'next/font/google'
import { FaPlay } from "react-icons/fa";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import useRandomMovie from '@/hooks/useRandomMovie';
import toast, { Toaster } from 'react-hot-toast';
import { BounceLoader } from 'react-spinners';
const montserrat = Montserrat({
  subsets: ['latin'],
});

const BillBoard = () => {


  const { data: movie, error, isLoading } = useRandomMovie();


  return (
    <>
      <Toaster />
      <section className="relative lg:h-[50vw] h-[200vw]">
        {error && toast.error('Something Bad Happend :(')}
        {isLoading && <div className='lg:h-[50vw] h-[200vw] grid place-items-center'><BounceLoader color="rgba(255, 32, 32, 1)" size={60} speedMultiplier={3} /></div>}

        {movie && <>
          <video onContextMenu={(e) => {
            e.preventDefault();
          }}
            src={movie?.videoUrl}
            poster={movie?.thumbnailUrl}
            autoPlay loop muted
            className="w-full lg:h-[50vw] h-[200vw] object-cover brightness-50">
          </video>
          <div className="absolute lg:top-[35%] lg:w-[35vw] top-[25%] w-[10rem] justify-start ml-10">
            <div className="flex flex-col justify-start h-full">
              <div className={`text-white text-4xl font-bold mb-4 ${montserrat.className}`}>{movie?.title}</div>
              <div className="text-white text-sm">{movie?.description}</div>
            </div>
            <div className="mt-10 flex gap-4">
              <button className="flex items-center transition
           bg-slate-600 hover:bg-slate-800 border-2 border-transparent hover:border-white
            cursor-pointer rounded-lg
            lg:h-[3rem] lg:p-4 p-2 h-10 lg:text-base text-sm">
                Add&nbsp;to&nbsp;My&nbsp;List
                <span className="ml-2"><BsFillBookmarkPlusFill /></span>
              </button>
              <button className="flex items-center transition
           bg-red-600 hover:bg-red-800 border-2 border-transparent hover:border-white
            cursor-pointer 
            rounded-lg lg:h-[3rem] p-2 h-10 lg:text-base text-sm"
              >Watch&nbsp;Now
                <span className="ml-2"><FaPlay /></span>
              </button>
            </div>
          </div>
        </>}
      </section>
    </>
  )
}

export default BillBoard;