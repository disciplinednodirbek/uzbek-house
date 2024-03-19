import { useQuery } from "@tanstack/react-query";
import { api } from "services/api";

async function fetchData({ queryKey }) {
  const { url, params } = queryKey[1];
  const res = await api.get(url, { params });
  return res.data;
}

export function useFetch({ name, url, queryOptions = {}, params = {} }) {
  return useQuery({
    queryKey: [name, { url, params }],
    queryFn: fetchData,
    ...queryOptions,
  });
}
