import useSWR from "swr";

const fetcher = (url: URL) => fetch(url).then(r => r.json());
export const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);
  return { data, error, isLoading, mutate }
}
export default useCurrentUser;