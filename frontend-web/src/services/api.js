import axios from "axios";

const base = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

console.log("[api] baseURL = ", base);

export const api = axios.create({
  baseURL: base   // http://localhost:4000/api
});


export const getCountry = (slug) => api.get(`/countries/slug/${slug}`);

export const deleteActivity = (slug, id) =>
  api.delete(`/countries/slug/${slug}/activities/${id}`);