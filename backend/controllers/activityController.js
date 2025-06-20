console.log("ACTIVITY CTRL loaded");

const Country = require("../models/Country");

// POST /api/countries/slug/:slug/activities
exports.addActivity = async (req, res) => {
  try {
    const country = await Country.findOne({ slug: req.params.slug });
    if (!country) return res.status(404).json({ error: "Country not found" });

    country.exploration.activities.push(req.body);
    await country.save();

    res.status(201).json(country.exploration.activities.slice(-1)[0]); // return the new one
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  GET all activities for one country
exports.getActivities = async (req, res) => {
  try {
    const country = await Country.findOne(
      { slug: req.params.slug },
      { "exploration.activities": 1, _id: 0 }
    );
    if (!country) return res.status(404).json({ error: "Country not found" });

    res.json(country.exploration.activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
