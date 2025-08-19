console.log("ACTIVITY CTRL loaded");

const mongoose = require('mongoose');
const Country = require("../models/Country");

// helper: normalize slug and basic field checks
const normalizeSlug = (slug) => String(slug || '').trim().toLowerCase();
const toStr = (v) => (typeof v === 'string' ? v.trim() : '');

const badRequest = (res, msg) => res.status(400).json({ msg });



// POST /api/countries/:slug/activities
exports.addActivity = async (req, res, next) => {
  try {
    const slug = normalizeSlug(req.params.slug);

    // basic validation
    const title = toStr(req.body?.title);
    if (!title) {
      return badRequest(res, 'Title field is required');
    }
    const description = toStr(req.body?.description);
    const imageUrl = toStr(req.body?.imageUrl);

    // find country
    const country = await Country.findOne({ slug });
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }

    // Ensure nested path exists
    country.exploration = country.exploration || {};
    country.exploration.activities = country.exploration.activities || [];

    // Push and save whitelisted fields
    country.exploration.activities.push({ title, description, imageUrl });
    await country.save();

    // Return newly created subdoc
    const activity = country.exploration.activities.at(-1);

    // Add a location header to 201 HTML response for clarity and return it
    res.set('Location', `/api/countries/${slug}/activities`);
    return res.status(201).json({ activity });
    
    // ValidationError → 400, else 500
  } catch (err) {
    if (err?.name === 'ValidationError') {
      err.statusCode = 400;
    }
    next(err);
  }
};


// GET /api/countries/:slug/activities
exports.getActivities = async (req, res, next) => {
  try {
    // get slug and ensure it is normalised
    const slug = normalizeSlug(req.params.slug);

    // query country and project which columns are returned (activities column, not id column)
    const country = await Country.findOne(
      { slug },
      { "exploration.activities": 1, _id: 0 }
    ).lean();                                  

    // return 404 if no country found
    if (!country) {
      return res.status(404).json({ error: 'Country not found' })
    }

    // return in a predicable shape (an array) so frontend can map safely
    const activities = country.exploration?.activities || [];
    return res.json({ activities });

  } catch (err) {
    next(err);
  }
};

// DELETE /api/countries/:slug/activities/:activityId
exports.deleteActivity = async (req, res, next) => {

  // get normalised slug and activity id from the URL
  try {
    const slug = normalizeSlug(req.params.slug);
    const { activityId } = req.params;

    // check that activity id is valid, if not fail fast with 400
    if (!mongoose.Types.ObjectId.isValid(activityId)) {
      return badRequest(res, 'Invalid activityId');
    }

    /* Pull the activity by matching the slug to the _id, $pull removes the 
    activity from the array in one DB operation, so no need to load whole 
    document */
    const result = await Country.updateOne(
      { slug, 'exploration.activities._id': activityId },
      { $pull: { 'exploration.activities': { _id: activityId } } }
    );

    // if nothing matched the id from the slug, return 404 country or activity not found
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Country or activity not found' });
    }

    // No content on success, 204 is correct REST status for successful delete
    return res.status(204).end();

  } catch (err) {
    next(err);
  }
};
