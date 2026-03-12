import axios, {AxiosError} from 'axios';
import type {ApiError, ValidationError} from "./types.ts";

export const $http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});


$http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError | ValidationError>) => {
    const status = error.response?.status
    if (status === 422) {
      return Promise.reject(error)
    }
    if (status && status >= 500) {
      console.error('Ошибка сервера:', error.response?.data?.message)
    }
    return Promise.reject(error)
  }
)
