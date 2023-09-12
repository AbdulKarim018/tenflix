import DeleteUserButton from "@/components/DeleteUserButton";
import Navbar from "@/components/Navbar";
import SignOutButton from "@/components/signOutButton";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Tenflix - An Awesome Streaming Service!',
  description: 'An Awesome Streaming Service!',
}


export default async function Home() {



  return (
    <>
      <div className="m-4">
        <Navbar />
        <SignOutButton />
        <DeleteUserButton />
      </div>
    </>
  )
}
