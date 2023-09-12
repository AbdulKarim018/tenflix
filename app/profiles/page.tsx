"use client"

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import Loading from "./Loading";



export default function ProfilesPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login ');
    },
  });

  if (status === 'loading') {
    return <Loading />
  }

  return (
    <>
      <Image
        src='/logo2.png'
        width={130}
        height={80}
        alt="TENFLIX logo"
        className="absolute left-1/2 -translate-x-1/2 -top-5"
      />
      <div className="bg-black h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl text-white mb-20 font-semibold">Who&apos;s Watching?</h2>
        <div className="flex flex-wrap gap-14 mx-4 justify-center">
          {/* profiles */}
          {session?.user?.Profiles?.map((prof, index) => (
            <div className="group text-center justify-center cursor-pointer" key={index} onClick={(e) => {
              e.stopPropagation()
              router.push(`/?profile=${index}`)
            }}>
              <div className="border-2 border-transparent overflow-hidden rounded-lg group-hover:border-white">
                <Image src={prof.image} alt={prof.name} width={80} height={80} className="lg:w-[8rem]" />
              </div>
              <div className="text-slate-300 pt-2 group-hover:text-white lg:text-lg">
                {prof.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};






// <div className="flex flex-wrap gap-14 mx-4 justify-center">
// {/* profiles */}
// {profs.map((prof, index) => (
//   <div className="group text-center justify-center cursor-pointer" key={index}>
//     <div className="border-2 border-transparent overflow-hidden rounded-lg group-hover:border-white">
//       <Image src='/profile-blue-1.png' alt="profile 1" width={80} height={80} className="lg:w-[8rem]" />
//     </div>
//     <div className="text-slate-300 pt-2 group-hover:text-white lg:text-lg">
//       {prof.name}
//     </div>
//   </div>
// ))}
// </div> 