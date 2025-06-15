import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL   // http://localhost:5000/api
});

// get everything we need for one country ──────────────────────────
export const getCountry = slug => api.get(`/countries/slug/${slug}`);
