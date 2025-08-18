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

const { requireAdmin } = require('../middleware/auth');
const activityRoutes = require('./activityRoutes');

/**
 * Countries API
 * - Public reads
 * - Admin-only writes/mutations
 * - Canonical slug path:   GET /api/countries/:slug
 * - Legacy slug alias:     GET /api/countries/slug/:slug   (kept for web)
 * - Admin CRUD by ID:      /api/countries/id/:id
 *
 * Route order matters: specific first, then generic `/:slug` last.
 */

/* 1️⃣  LIST + CREATE  */
router.get('/', getAllCountries);          // Public list
router.post('/', requireAdmin, addCountry);              // Admin create

/* 2️⃣  ID-BASED CRUD  (constant first segment “id”)  */
router.get('/id/:id',     getCountryById);          // Public detail by ID
router.patch('/id/:id',   requireAdmin, updateCountryById);       // Admin update by ID
router.delete('/id/:id',  requireAdmin, deleteCountryById);       // Admin delete by ID

/* 3️⃣  LEGACY SLUG PATH (kept for backward compat) */
router.get('/slug/:slug', getCountryBySlug);   // e.g. /api/countries/slug/samoa

/* 3️⃣) NESTED ACTIVITIES (mix of public + admin inside activityRoutes) 
   - Keep GETs public inside activityRoutes
   - Require admin for POST/PATCH/DELETE inside activityRoutes
   (Do the role checks INSIDE activityRoutes so GET stays open)
*/
router.use('/:slug/activities', activityRoutes);

/* 5️⃣ CANONICAL SLUG DETAIL — keep LAST to avoid collisions */
router.get('/:slug', getCountryBySlug);     // e.g. /api/countries/samoa

module.exports = router;
