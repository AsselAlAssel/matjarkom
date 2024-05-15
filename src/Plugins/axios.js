import axios from "axios";
const axiosClient = axios.create({
  // baseURL: "https://graduate-project-backend-1.onrender.com/matjarcom/api/v1",
  baseURL: "http://localhost:3000/matjarcom/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
axiosClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
