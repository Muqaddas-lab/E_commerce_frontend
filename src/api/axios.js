import axios from "axios";

// ✅ Base URL dynamically set for local or deployed backend
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api" // local backend
    : "https://e-commerce-backend-coral-ten.vercel.app/api"; // deployed backend

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // cookies/token support
});

// ✅ Send token in each request if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

