// backend/routes/countryRoutes.js
const express = require('express');
const router  = express.Router();

const {
  addCountry,
  getAllCountries,
  getCountryById,
  getCountryBySlug,
  updateCountryById,
  deleteCountryById,
} = require('../controllers/countryController');

const activityRoutes = require('./activityRoutes');

/* ──────────────────────────────────────────────
   COUNTRY ROUTES - keep both mobile *and* web UIs
   Order matters: most specific → most generic
──────────────────────────────────────────────── */

/* 1️⃣  LIST + CREATE  */
router.get('/', getAllCountries);          // GET /api/countries
router.post('/', addCountry);              // POST /api/countries

/* 2️⃣  ID-BASED CRUD  (constant first segment “id”)  */
router.get('/id/:id',     getCountryById);
router.patch('/id/:id',   updateCountryById);
router.delete('/id/:id',  deleteCountryById);

/* 3️⃣  **LEGACY WEB PATH**  (/slug/…)  */
router.get('/slug/:slug', getCountryBySlug);   // GET /api/countries/slug/samoa

/* 4️⃣  NESTED ACTIVITIES  (/🇼🇸/activities)  */
router.use('/:slug/activities', activityRoutes); // GET /api/countries/samoa/activities

/* 5️⃣  CANONICAL SLUG DETAIL (mobile)  */
router.get('/:slug', getCountryBySlug);     // GET /api/countries/samoa

module.exports = router;
