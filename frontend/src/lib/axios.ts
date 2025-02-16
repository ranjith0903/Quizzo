import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://quizzo-oyf3.onrender.com/api" : "/api",
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
