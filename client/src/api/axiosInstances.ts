/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  return config;
};

const requestErrorInterceptor = (error: any) => Promise.reject(error);

const responseInterceptor = (response: AxiosResponse) => response;

const responseErrorInterceptor = (error: any) => Promise.reject(error);

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
axiosInstance.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
