const express = require("express");
const router  = express.Router();

const {
  addCountry,
  getAllCountries,
  getCountryById,
  getCountryBySlug,
  updateCountryById,
  deleteCountryById,
} = require("../controllers/countryController");

const activityRoutes = require("./activityRoutes");

/* ─────────── nested activities ──────────── */
// /api/countries/:slug/activities  → activitiesRouter
router.use("/:slug/activities", activityRoutes);

/* ─────────── country core routes ────────── */

// GET /api/countries            – all countries
router.get("/", getAllCountries);

// POST /api/countries           – create
router.post("/", addCountry);

// GET  /api/countries/:slug     – by slug (human-friendly)
router.get("/:slug", getCountryBySlug);

/* 
   ID-based routes live on /id/:id  so they never clash with slugs
   (and we don’t need path-to-regexp gymnastics)
*/
router.get("/id/:id", getCountryById);
router.patch("/id/:id", updateCountryById);
router.delete("/id/:id", deleteCountryById);

module.exports = router;
