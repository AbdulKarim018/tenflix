import fetcher from '@/lib/utils/fetcher';
import useSWR from 'swr';

export const useAllMoviesFetcher = () => {
  const { data, error, isLoading } = useSWR('/api/movies', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, error, isLoading };
}

export default useAllMoviesFetcher;