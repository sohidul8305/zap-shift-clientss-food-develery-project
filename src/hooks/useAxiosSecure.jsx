// src/hooks/useAxiosSecure.jsx
import axios from "axios";

// Axios instance
const axiosSecure = axios.create({
  baseURL: "http://localhost:3000", // তোমার backend URL
  withCredentials: true,            // optional, যদি cookie/authorization দরকার হয়
});

// Hook function
const useAxiosSecure = () => {
  return axiosSecure; // 🔑 Axios instance return করা হচ্ছে
};

export default useAxiosSecure;
