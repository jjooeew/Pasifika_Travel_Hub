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

// GET /api/admin/countries/:slug/activities  (admin only)
exports.listByCountryAdmin = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const activities = await Activity.find({ countrySlug: slug })
      .sort({ updatedAt: -1 })
      .select("title imageUrl locationLabel tags isPublished updatedAt");
    res.json({ activities });
  } catch (err) {
    next(err);
  }
};

// GET /api/activities/:id
exports.getActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById( id ).lean();
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    return res.json( activity );
  } catch (err) {
    next(err);
  }
}

// GET /api/public/activities/:id
exports.getPublicActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById({ _id: id, isPublished: true }).lean();
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    return res.json( activity );
  } catch (err) {
    next(err);
  }
}



// POST /api/countries/:slug/activities
exports.addActivity = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const {
      title,
      description = "",
      imageUrl = "",
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

// PUT /api/activities/:id
exports.updateActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const updated = await Activity.findByIdAndUpdate(
      id,
      { ...payload },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Activity not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
};
