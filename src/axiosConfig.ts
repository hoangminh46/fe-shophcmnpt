// axiosConfig.ts
import axios from "axios";
import { shoesStore } from "./lib/store";
import { logoutUser } from "./lib/features/authSlice";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        if (response.status === 200) {
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        const { store } = shoesStore();
        store.dispatch(logoutUser());
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
