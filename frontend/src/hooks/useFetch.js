import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

async function fetchData({ queryKey }) {
  const { url, params } = queryKey;
  try {
    const response = await api.get(url, params);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export function useFetch({ name, url, queryOptions = {}, params = {} }) {
  return useQuery({
    queryKey: [name, { url, params }],
    queryFnL: fetchData,
    ...queryOptions,
  });
}
