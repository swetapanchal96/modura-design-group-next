import axios, { AxiosError, type AxiosResponse } from 'axios';
import type { ApiErrorResponse, FieldErrors } from '@/types/admin';
import { adminPath } from './paths';

export const TOKEN_KEY = 'modura_admin_token';
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/+$/, '');

export const getToken = (): string | null => (typeof window === 'undefined' ? null : window.localStorage.getItem(TOKEN_KEY));
export const setToken = (t: string): void => window.localStorage.setItem(TOKEN_KEY, t);
export const clearToken = (): void => window.localStorage.removeItem(TOKEN_KEY);

const api = axios.create({ baseURL: API_URL, timeout: 60000 });

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const status = error.response?.status;
    const isLogin = error.config?.url?.includes('/auth/login');
    if (status === 401 && !isLogin && typeof window !== 'undefined') {
      clearToken();
      if (!window.location.pathname.startsWith(adminPath('/login'))) window.location.href = adminPath('/login?expired=1');
    }
    return Promise.reject(error);
  }
);

const errorBody = (err: unknown): ApiErrorResponse | undefined =>
  axios.isAxiosError<ApiErrorResponse>(err) ? err.response?.data : undefined;

/** Human readable error message from any axios error. */
export function errorMessage(err: unknown, fallback = 'Something went wrong'): string {
  if (axios.isAxiosError(err) && !err.response) return 'Cannot reach the server. Is the API running?';
  return errorBody(err)?.message || fallback;
}

/** Field errors object from a 422 response ({ field: 'message' }). */
export const fieldErrors = (err: unknown): FieldErrors => errorBody(err)?.errors || {};

/** Downloads a protected file (resume, excel) using the auth token. */
export async function downloadFile(url: string, fallbackName = 'download', params?: Record<string, string>): Promise<void> {
  const res: AxiosResponse<Blob> = await api.get(url, { responseType: 'blob', params });
  const disposition = String(res.headers['content-disposition'] || '');
  const match = disposition.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
  const name = match ? decodeURIComponent(match[1]) : fallbackName;
  const href = URL.createObjectURL(res.data);
  const a = document.createElement('a');
  a.href = href;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

export default api;
