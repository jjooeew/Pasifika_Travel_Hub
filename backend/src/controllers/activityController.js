// backend/src/controllers/activityController.js
const Country = require("../models/Country");
const Activity = require("../models/Activity");

// GET /api/countries/:slug/activities
exports.listByCountry = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const activities = await Activity.find({ countrySlug: slug, isPublished: true })
      .sort({ order: 1, createdAt: -1 });
    res.json({ activities });
  } catch (err) {
    next(err);
  }
};

// POST /api/countries/:slug/activities
exports.addActivity = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const {
      title,
      description = "",
      imageUrl = "",
      locationLabel = "",
      tags,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ msg: "Title is required" });
    }

    // find the country by slug
    const country = await Country.findOne({ slug }).lean();
    if (!country) return res.status(404).json({ msg: "Country not found" });

    // normalize tags: accept array or comma-separated string
    const normalizedTags = Array.isArray(tags)
      ? tags.map((t) => String(t).trim()).filter(Boolean)
      : typeof tags === "string" && tags.trim()
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const activity = await Activity.create({
      countryId: country._id,
      countrySlug: country.slug,
      countryName: country.countryName, // optional denorm
      title: title.trim(),
      description,
      imageUrl,
      locationLabel,
      tags: normalizedTags,
      isPublished: true,
    });

    res.status(201).json({ activity });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/activities/:id
exports.deleteActivity = async (req, res, next) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
