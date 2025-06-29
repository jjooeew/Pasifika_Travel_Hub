import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Update to match your backend
  timeout: 10000,
});

export default api;