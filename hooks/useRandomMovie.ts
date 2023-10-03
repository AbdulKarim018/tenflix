import { Movie } from "@prisma/client";
import useSWR from "swr";


const fetcher = (url: URL) => (fetch(url).then(r => r.json()));

export default function useRandomMovie() {
  const { data, error, isLoading } = useSWR<Movie>('/api/random', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return { data, error, isLoading };
}