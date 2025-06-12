const express = require("express");
const router = express.Router();


const {
    addCountry,
    getAllCountries,
    getCountryById,
    getCountryBySlug,
    updateCountryById,
    deleteCountryById

} = require('../controllers/countryController')

const Country = require("../models/Country");

// get all countries
router.get("/", getAllCountries)

// get country by id
router.get("/:id", getCountryById)

// get country by country name (slug)
router.get("/slug/:slug", getCountryBySlug)

// add country
router.post("/", addCountry)

// update country by id (change to name?)
router.patch("/:id", updateCountryById)


// delete country by ID
router.delete("/:id", deleteCountryById)

module.exports = router;
