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


router.get('/', getAllCountries);
router.post('/', requireAdmin, addCountry); 

router.get('/:slug', getCountryBySlug);   
router.put('/:slug', requireAdmin, updateCountryBySlug);
router.delete('/:slug', requireAdmin, deleteCountryBySlug);

router.use('/:slug/activities', activityRoutes);


// // Legacy routes
// router.get('/slug/:slug', getCountryBySlug);   
// router.get('/id/:id',     getCountryById);          
// router.patch('/id/:id',   requireAdmin, updateCountryById);      
// router.delete('/id/:id',  requireAdmin, deleteCountryById);      




module.exports = router;
