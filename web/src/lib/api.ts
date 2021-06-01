import axios from 'axios';

import { getFromStorage } from './auth';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
});

instance.interceptors.request.use((config) => {
  const { token } = getFromStorage();

  return {
    ...config,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export default instance;
