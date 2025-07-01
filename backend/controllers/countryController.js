const Country = require("../models/Country");


// GET /api/countries
exports.getAllCountries = async (req, res, next) => {
  try {
    const countries = await Country.find().lean();
    res.json(countries);
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};


// GET /api/countries/:id  (Mongo ObjectId)
exports.getCountryById = async (req, res, next) => {
  try {
    const country = await Country.findById(req.params.id).lean();
    if (!country) {
      const err = new Error("Country not found");
      err.statusCode = 404;
      throw err;
    }
    res.json(country);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};


// GET /api/countries/slug/:slug
exports.getCountryBySlug = async (req, res, next) => {
  try {
    const country = await Country.findOne({ slug: req.params.slug }).lean();
    if (!country) {
      const err = new Error("Country not found");
      err.statusCode = 404;
      throw err;
    }
    res.json(country);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};


// POST /api/countries
exports.addCountry = async (req, res, next) => {
  try {
    const newCountry = await Country.create(req.body);
    res.status(201).json(newCountry);
  } catch (err) {
    err.statusCode = 400;          
    next(err);
  }
};


// PATCH /api/countries/:id
exports.updateCountryById = async (req, res, next) => {
  try {
    const updated = await Country.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      const err = new Error("Country not found");
      err.statusCode = 404;
      throw err;
    }
    res.json(updated);
  } catch (err) {
    err.statusCode = err.statusCode || 400;
    next(err);
  }
};


// DELETE /api/countries/:id
exports.deleteCountryById = async (req, res, next) => {
  try {
    const deleted = await Country.findByIdAndDelete(req.params.id);
    if (!deleted) {
      const err = new Error("Country not found");
      err.statusCode = 404;
      throw err;
    }
    res.json({ message: "Country deleted successfully" });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

