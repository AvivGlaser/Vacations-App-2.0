import axios, { AxiosError } from "axios";
import { getTokenLS } from "../../Helpers/authHelpers";
import {  API_URLS } from "../../Environment/enviornment";

const axiosInstance: any = axios.create({ baseURL: `${API_URLS.BASE}` });

axiosInstance.interceptors.request.use((request: any) => {
  request.headers.Authorization = getTokenLS();
  return request;
});

axiosInstance.interceptors.response.use(
  (response: any): string => {
    response.headers.Authorization = getTokenLS();
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
