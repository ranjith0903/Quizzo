import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://vercel.com/ranjithkumarhassan-gmailcoms-projects/quizo/GZurGBHmtqNUTevuJXfgus7WG3Mc/api" : "/api",
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
