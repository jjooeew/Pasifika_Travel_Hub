import axios from "axios";
import { getAuth } from "firebase/auth";

const baseURL = process.env.REACT_APP_API_URL
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
})

export const createCountry = (body) => api.post(`/countries`, body);

export const getCountry = (slug) => api.get(`/countries/slug/${slug}`);

export const addActivity = (slug, body) =>
  api.post(`/countries/${slug}/activities`, body);

export const deleteActivity = (slug, id) =>
  api.delete(`/countries/slug/${slug}/activities/${id}`);
