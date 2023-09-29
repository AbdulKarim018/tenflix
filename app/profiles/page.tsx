
import Image from "next/image";
import ProfilesSelection from "@/components/ProfilesSelection";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";



export default async function ProfilesPage() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
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
          <ProfilesSelection session={session} />
        </div>
      </div>
    </>
  );
};
