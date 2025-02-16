import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL:"https://quizzo-oyf3.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
