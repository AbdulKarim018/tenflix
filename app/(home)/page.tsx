import BillBoard from "@/components/BillBoard";
import DeleteUserButton from "@/components/DeleteUserButton";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";



export default async function Home() {



  return (
    <>
      <Navbar />
      <BillBoard />
      <MovieList />
      <DeleteUserButton />
    </>
  )
}
