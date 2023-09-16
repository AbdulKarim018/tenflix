"use client"

import { Movie } from "@prisma/client";
import { useEffect, useState } from "react";
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({
  subsets: ['latin'],
});

const BillBoard = () => {
  const [data, setData] = useState<Movie>()

  const randomMovieFetcher = async () => {
    const response = await fetch(`/api/random`, {
      next: { revalidate: 300 },
    })
    const movie = await response.json();
    setData(movie);
  }

  useEffect(() => {
    randomMovieFetcher();

    return () => {
      randomMovieFetcher();
    }
  }, [])


  return (
    <>
      <div className="relative h-[50vw]">
        <video src={data?.videoUrl} poster={data?.thumbnailUrl} autoPlay loop muted className="w-full lg:h-[50vw] h-[200vw] object-cover brightness-50 -z-10 blur-sm"></video>
      </div>
      <div className="absolute lg:top-[35%] lg:w-[35vw] top-[25%] w-[10rem] justify-start ml-10">
        <div className="flex flex-col justify-start h-full">
          <div className={`text-white text-4xl font-bold mb-4 ${montserrat.className}`}>{data?.title}</div>
          <div className="text-white text-sm">{data?.description}</div>
        </div>
      </div>

      <div className="h-[900vh]"></div>
      <div className="h-[900vh]"></div>
      <div className="h-[900vh]"></div>
      <div className="h-[900vh]"></div>
      <div className="h-[900vh]"></div>
    </>
  )
}

export default BillBoard;