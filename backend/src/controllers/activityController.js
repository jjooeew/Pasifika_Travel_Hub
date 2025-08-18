console.log("ACTIVITY CTRL loaded");

const mongoose = require('mongoose');
const Country = require("../models/Country");

// helper: normalize slug and basic field checks
function normalizeSlug(slug) {
  return String(slug || '').trim().toLowerCase();
}

function badRequest(res, msg) {
  return res.status(400).json({ error: msg || 'Bad request' });
}



// POST /api/countries/:slug/activities
exports.addActivity = async (req, res, next) => {
  try {
    const slug = normalizeSlug(req.params.slug);

    // basic validation
    const { name, description, imageUrl } = req.body || {};
    if (!name || typeof name !== 'string') {
      return badRequest(res, 'Field "name" is required and must be a string');
    }


    const country = await Country.findOne({ slug });
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }

    // Ensure nested path exists
    country.exploration = country.exploration || {};
    country.exploration.activities = country.exploration.activities || [];

    // Push and save (this triggers schema validation on subdocs)
    country.exploration.activities.push({ name, description, imageUrl, ...req.body });
    await country.save();

    const newActivity = country.exploration.activities[country.exploration.activities.length - 1];
    return res.status(201).json({ data: newActivity });
  } catch (err) {
    // ValidationError → 400, else 500
    if (err?.name === 'ValidationError') {
      err.statusCode = 400;
    }
    next(err);
  }
};


// GET /api/countries/:slug/activities
exports.getActivities = async (req, res, next) => {
  try {

    const slug = normalizeSlug(req.params.slug);

    const country = await Country.findOne(
      { slug },
      { "exploration.activities": 1, _id: 0 }
    ).lean();                                  

    if (!country) {
      return res.status(404).json({ error: 'Country not found' })
    }

    const activities = country.exploration?.activities || [];
    return res.json({ data: activities });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/countries/:slug/activities/:activityId
exports.deleteActivity = async (req, res, next) => {
  try {
    const slug = normalizeSlug(req.params.slug);
    const { activityId } = req.params;

    // Fast-fail on clearly bad ObjectId (your subdoc _id is ObjectId by default)
    if (!mongoose.Types.ObjectId.isValid(activityId)) {
      return res.status(400).json({ error: 'Invalid activityId' });
    }

    // Pull the activity by _id
    const updateRes = await Country.updateOne(
      { slug, 'exploration.activities._id': activityId },
      { $pull: { 'exploration.activities': { _id: activityId } } }
    );

    if (updateRes.matchedCount === 0) {
      return res.status(404).json({ error: 'Country or activity not found' });
    }

    // No content on success
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};
