import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL:"http://localhost:5000/api",
  withCredentials: true,
});

export default axiosInstance;
