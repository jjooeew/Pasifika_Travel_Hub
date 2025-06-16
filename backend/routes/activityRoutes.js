const router = require("express").Router({ mergeParams: true });   // ✅ Express router
const {
  addActivity,
  getActivities
} = require("../controllers/activityController");

// 🕵️‍♂️ DEBUG: log the types we just imported
console.log("addActivity:", typeof addActivity, "getActivities:", typeof getActivities);

// base path = /api/countries/slug/:slug/activities
router.route("/")
  .get(getActivities)   // optional
  .post(addActivity);

module.exports = router;