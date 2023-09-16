import BillBoard from "@/components/BillBoard";
import DeleteUserButton from "@/components/DeleteUserButton";
import Navbar from "@/components/Navbar";
import SignOutButton from "@/components/SignOutButton";



export default async function Home() {



  return (
    <>
      <div className="">
        <Navbar />
        <BillBoard />
        <SignOutButton />
        <DeleteUserButton />
      </div>
    </>
  )
}
