const Country = require("../models/Country");

const normalizeSlug = (s) =>
  String(s || "").trim().toLowerCase().replace(/\s+/g, "-");
const toStr = (v) => (typeof v === "string" ? v.trim() : "");

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

// GET /api/countries/:slug 
exports.getCountryBySlug = async (req, res, next) => {
  try {
    const slug = normalizeSlug(req.params.slug);
    const country = await Country.findOne({ slug }).lean();
    if (!country) return res.status(404).json({ message: "Country not found" });
    return res.json({ country });
  } catch (err) {
    next(err);
  }
};


// GET /api/admin/countries/slug
exports.getCountryBySlugAdmin = async (req, res, next) => {
  try {
    const slug = normalizeSlug(req.params.slug);
    const country = await Country.findOne({ slug }).lean();
    if (!country) return res.status(404).json({ message: "Country not found" });
    return res.json({ country });
  } catch (err) {
    next(err);
  }
};

// POST /api/countries
exports.addCountry = async (req, res, next) => {
  try {
    const body = { ...req.body };
    const provided = toStr(body.slug);
    body.slug = provided.trim()
      ? normalizeSlug(provided)
      : normalizeSlug(body.countryName);

    const country = await Country.create(body);

    res.set("Location", `/api/countries/${country.slug}`);
    return res.status(201).json({ country });
  } catch (err) {
    if (err?.name === "ValidationError")
      return res.status(400).json({ message: err.message });
    next(err);
  }
};

// PUT /api/countries/:slug
exports.updateCountryBySlug = async (req, res, next) => {
  try {
    const slug = normalizeSlug(req.params.slug);

    // whitelist fields allowed to change
    const allowed = ["countryName", "flagUrl", "intro", "history"];
    const updates = {};
    for (const k of allowed) if (k in req.body) updates[k] = req.body[k];

    // auto-update slug if name changes
    if (typeof updates.countryName === "string" && updates.countryName.trim()) {
      updates.slug = normalizeSlug(updates.countryName);
    }

    const country = await Country.findOneAndUpdate(
      { slug },
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();

    if (!country) return res.status(404).json({ message: "Country not found" });
    return res.json({ country });
  } catch (err) {
    if (err?.name === "ValidationError")
      return res.status(400).json({ message: err.message });
    next(err);
  }
};

// DELETE /api/countries/:slug
exports.deleteCountryBySlug = async (req, res, next) => {
  try {
    const slug = normalizeSlug(req.params.slug);
    const result = await Country.deleteOne({ slug });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Country not found" });
    }
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};
