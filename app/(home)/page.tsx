import BillBoard from "@/components/BillBoard";
import DeleteUserButton from "@/components/DeleteUserButton";
import Navbar from "@/components/Navbar";



export default async function Home() {



  return (
    <>
      <div className="">
        <Navbar />
        <BillBoard />
        <DeleteUserButton />
      </div>
    </>
  )
}
