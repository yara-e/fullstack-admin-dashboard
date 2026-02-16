import axios from "axios";
import { getToken, isTokenExpired } from "../../utils/token";
import { store } from "../../app/store"
import { logout } from "@/features/auth/authSlice";
 

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    if (isTokenExpired(token)) {
       
      store.dispatch(logout());
      return config;
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  
  (res) => res ,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);
