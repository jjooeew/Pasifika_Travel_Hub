// backend/routes/countryRoutes.js
const express = require('express');
const router  = express.Router();

const {
  addCountry,
  getAllCountries,
  getCountryBySlug,
  updateCountryBySlug,
  deleteCountryBySlug,
} = require('../controllers/countryController');

const { requireAdmin } = require('../middleware/auth');
const activityRoutes = require('./activityRoutes');


router.get('/countries', getAllCountries);
router.post('/countries', requireAdmin, addCountry); 

router.get('/countries/:slug', getCountryBySlug);   
router.put('/countries/:slug', requireAdmin, updateCountryBySlug);
router.delete('/countries/:slug', requireAdmin, deleteCountryBySlug);

router.use('/:slug/activities', activityRoutes);


// // Legacy routes
// router.get('/slug/:slug', getCountryBySlug);   
// router.get('/id/:id',     getCountryById);          
// router.patch('/id/:id',   requireAdmin, updateCountryById);      
// router.delete('/id/:id',  requireAdmin, deleteCountryById);      




module.exports = router;
