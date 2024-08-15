import axios from "axios";

const BASE_URL = "http://13.49.35.186";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
