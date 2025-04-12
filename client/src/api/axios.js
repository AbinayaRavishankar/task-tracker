import axios from "./api/axios";

const instance = axios.create({
  baseURL: "https://task-tracker-a5fa.onrender.com/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
