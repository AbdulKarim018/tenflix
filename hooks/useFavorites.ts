import useSWR from "swr";


const fetcher = (url: URL) => fetch(url).then(r => r.json());

export const useFavorites = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/favorite", fetcher, {});
  return { data, error, isLoading, mutate }
}

export default useFavorites;