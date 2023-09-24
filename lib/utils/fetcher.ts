export const fetcher = (url: URL) => fetch(url).then(res => res.json())
export default fetcher;