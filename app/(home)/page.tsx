import DeleteUserButton from "@/components/DeleteUserButton";
import Navbar from "@/components/Navbar";
import SignOutButton from "@/components/signOutButton";
import { Metadata } from "next";



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
