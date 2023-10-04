import useSWR from 'swr';



const fetcher = (url: URL) => fetch(url).then(r => r.json());

export const useLatestMovies = () => {
  const { data, error, isLoading } = useSWR('/api/latest', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, error, isLoading };
}

export default useLatestMovies;