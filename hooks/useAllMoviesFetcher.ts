import useSWR from 'swr';



const fetcher = (url: URL) => fetch(url, { method: 'POST' }).then(r => r.json());

export const useAllMoviesFetcher = () => {
  const { data, error, isLoading } = useSWR('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, error, isLoading };
}

export default useAllMoviesFetcher;