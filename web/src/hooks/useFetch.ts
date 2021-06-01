import useSWR from 'swr';

import api from '../lib/api';

const fetcher = async (url: string) => {
  const response = await api.get(url);

  return response.data;
};

export function useFetch<Data = any, Error = any>(url: string) {
  return useSWR<Data, Error>(url, fetcher);
}
