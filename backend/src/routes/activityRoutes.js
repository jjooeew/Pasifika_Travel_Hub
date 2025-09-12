const express = require("express");
const {
  listByCountry,
  addActivity,
  deleteActivity,
  updateActivity,
  getActivity,
  getPublicActivity,
  listByCountryAdmin
} = require("../controllers/activityController");
const { requireAdmin } = require("../middleware/auth");

const r = express.Router();


r.get("/activities/:id", requireAdmin, getActivity)
r.get("/public/activities/:id", getPublicActivity)
r.get("/countries/:slug/activities", listByCountry);
r.get("/admin/countries/:slug/activities", requireAdmin, listByCountryAdmin)
r.post("/countries/:slug/activities", requireAdmin, addActivity);
r.delete("/activities/:id", requireAdmin, deleteActivity);
r.put("/activities/:id", requireAdmin, updateActivity);

module.exports = r;
