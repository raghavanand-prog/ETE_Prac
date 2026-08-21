import axios from "axios";

// Single Axios instance for all API calls
const API = axios.create({
  baseURL: "http://localhost:5001/api"
});

// Attach JWT token to every protected request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;