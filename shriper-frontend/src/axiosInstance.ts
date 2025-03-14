import axios, { type AxiosInstance } from "axios";

// TODO: add prod env
const baseURL = import.meta.env.VITE_API_BASE_URL; // Or whatever your environment variable is named

if (!baseURL) {
  throw new Error(
    "REACT_APP_API_BASE_URL environment variable is not defined."
  );
}

const instance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Request interceptor
// instance.interceptors.request.use(
//   (config) => {
//     // Example: config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
//     return config;
//   },
//   (error: AxiosError): Promise<AxiosError> => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// instance.interceptors.response.use(
//   (response: AxiosResponse): AxiosResponse => {
//     return response;
//   },
//   (error: AxiosError): Promise<AxiosError> => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized access
//       // Example: window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
