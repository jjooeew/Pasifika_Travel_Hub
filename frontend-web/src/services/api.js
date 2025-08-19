import axios from "axios";
import { getAuth } from "firebase/auth";

const baseURL = process.env.REACT_APP_API_URL;
export const api = axios.create({
  baseURL,
});

// Add firebase ID token if logged in

api.interceptors.request.use(async (config) => {
  try {
    const user = getAuth().currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.warn("[api] token attach failed: ", e?.message);
  }
  return config;
});

export const getCountries = () => 
  api.get("/api/countries");
export const getCountry = (slug) => 
  api.get(`/api/countries/${slug}`);
export const createCountry = (payload) => 
  api.post(`/countries`, payload);
export const updateCountry = (slug, payload) =>
  api.put(`/api/countries/${slug}`, payload);
export const deleteCountry = (slug) => 
  api.delete(`/api/countries/${slug}`);

export const getActivities = (slug) =>
  api.get(`/api/countries/${slug}/activities`);
export const addActivity = (slug, payload) =>
  api.post(`/api/countries/${slug}/activities`, payload);
export const deleteActivity = (slug, id) =>
  api.delete(`/api/countries/${slug}/activities/${id}`);
