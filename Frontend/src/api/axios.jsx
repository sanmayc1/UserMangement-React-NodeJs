import axios from "axios";
import { store } from "../Store/reduxStore.js";
const baseURL = import.meta.env.VITE_baseUrl;

export const DataBase = axios.create({
  baseURL,
});

DataBase.interceptors.request.use((config) => {
    const token = store.getState().auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
