import fetcher from "@/lib/utils/fetcher";
import { Movie } from "@prisma/client";
import useSWR from "swr";

export default function useRandomMovieFetcher() {
  const { data, error, isLoading } = useSWR('/api/random', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return { data, error, isLoading };
}