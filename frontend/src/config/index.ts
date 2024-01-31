'use strict'

// export const API_PROD_URL = 'https://api.callezenwaka.uc.r.appspot.com/api/v1/';
// export const API_DEV_URL = 'http://localhost:8080/api/v1/';

// export const baseURL = import.meta.env.DEV? `http://localhost:8080/api/v1/` : `https://api.callezenwaka.uc.r.appspot.com/api/v1/`;

// import axios, { AxiosInstance } from "axios";
// import Ticket from '@/types/Ticket';
// import Response from '@/types/Response';

// export const apiClient: AxiosInstance = axios.create({
//   baseURL,
//   withCredentials: false,
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
// });

// export default {
//   submitTicket(params: Ticket): Promise<Response> {
//     return apiClient.post('/events', params)
//   },
// }

import axios, { AxiosResponse } from "axios";
// type method = "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | undefined;
// type method = string | undefined;

// Uncomment for local development
export const baseURL = import.meta.env.DEV? `http://localhost:8080/api/v1/` : `https://api.callezenwaka.uc.r.appspot.com/api/v1/`;

// export default apiClient;
export const request = async <T = never, R = AxiosResponse<T>>(
  url: string, 
  method: string | undefined, 
  token?: string, 
  data?: unknown, 
  query?: unknown
  ): Promise<R> => {
  const res = await axios({
    method: method,
    url: `${baseURL + url}`,
    data: data,
    params: query,
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
	return res.data;
};
