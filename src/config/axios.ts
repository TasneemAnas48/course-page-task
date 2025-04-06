import { store } from "@/store/store";
import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND}/api`,
  headers: {
    Accept: "application/json",
    // "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (store.getState().auth.accessToken) {
      config.headers["Authorization"] = `Bearer ${store.getState().auth.accessToken}`;
    }
    config.headers["Accept-Language"] = localStorage.getItem("lang") || "en";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error?.response?.data);
  }
);

const { get, post, put, patch, delete: destroy } = apiClient;
export { get, post, put, destroy, patch };

export default apiClient;
