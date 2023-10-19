import useSWR from "swr";


const fetcher = (url: URL) => fetch(url).then(r => r.json());

export const useMovie = (movieId: string) => {
  const { data, error, isLoading, mutate } = useSWR(`/api/movie?movieId=${movieId}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, error, isLoading, mutate }
} 