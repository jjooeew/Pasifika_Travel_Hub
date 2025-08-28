const express = require("express");
const {
  listByCountry,
  addActivity,
  deleteActivity,
} = require("../controllers/activityController");
const { requireAdmin } = require("../middleware/auth");

const r = express.Router();

r.get("/countries/:slug/activities", listByCountry);
r.post("/countries/:slug/activities", requireAdmin, addActivity);
r.delete("/activities/:id", requireAdmin, deleteActivity);

module.exports = r;
