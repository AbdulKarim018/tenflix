import fetcher from '@/lib/utils/fetcher';
import useSWR from 'swr';

export const useAllMoviesFetcher = () => {
  const { data, error, isLoading } = useSWR('/api/movies', fetcher, {
    refreshInterval: 5000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, error, isLoading };
}

export default useAllMoviesFetcher;