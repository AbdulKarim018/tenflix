import BillBoard from "@/components/BillBoard";
import DeleteUserButton from "@/components/DeleteUserButton";
import NewMovieList from "@/components/NewMovieList";
import MyList from "@/components/MyList";
import Navbar from "@/components/Navbar";



export default async function Home() {



  return (
    <>
      <Navbar />
      <BillBoard />
      <NewMovieList />
      <MyList />
      <DeleteUserButton />
    </>
  )
}
