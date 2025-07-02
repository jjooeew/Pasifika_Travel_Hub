console.log("ACTIVITY CTRL loaded");

const Country = require("../models/Country");


// POST 
exports.addActivity = async (req, res, next) => {
  try {
    const country = await Country.findOne({ slug: req.params.slug });
    if (!country) {
      const err = new Error("Country not found");
      err.statusCode = 404;
      throw err;
    }

    country.exploration.activities.push(req.body);
    await country.save();

    const newActivity = country.exploration.activities.slice(-1)[0];
    res.status(201).json(newActivity);
  } catch (err) {
    err.statusCode = err.statusCode || 400; 
    next(err);                                
  }
};


// GET 
exports.getActivities = async (req, res, next) => {
  try {
    const country = await Country.findOne(
      { slug: req.params.slug },
      { "exploration.activities": 1, _id: 0 }
    ).lean();                                  

    if (!country) {
      const err = new Error("Country not found");
      err.statusCode = 404;
      throw err;
    }

    res.json(country.exploration.activities);
  } catch (err) {
    err.statusCode = err.statusCode || 500;     
    next(err);
  }
};

// Delete
exports.deleteActivity = async (req, res, next) => {
  try {
    const { slug, activityId } = req.params;

    const country = await Country.findOneAndUpdate(
      { slug },
      { $pull: { "exploration.activities": { _id: activityId } } },
      { new: true }
    );

    if (!country) {
      const err = new Error("Country not found");
      err.statusCode = 404;
      throw err;
    }

    res.json({ message: "Activity deleted" });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};
