"use client"

import { ProfileContext } from "@/hooks/contexts/ProfileContext";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const ProfilesSelection = ({ session }: { session: Session }) => {
  const router = useRouter();
  const { setProfile } = useContext(ProfileContext);

  return (
    <>
      {session?.user?.Profiles?.map((prof, index) => (
        <div className="group text-center justify-center cursor-pointer" key={index} onClick={(e) => {
          e.stopPropagation();
          setProfile(index);
          router.push('/');
        }}>
          <div className="border-2 border-transparent overflow-hidden rounded-lg group-hover:border-white">
            <Image src={prof.image} alt={prof.name} width={80} height={80} className="lg:w-[8rem]" />
          </div>
          <div className="text-slate-300 pt-2 group-hover:text-white lg:text-lg">
            {prof.name}
          </div>
        </div>
      ))}
    </>
  )
}

export default ProfilesSelection