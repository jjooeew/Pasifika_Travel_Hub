const express = require('express')
const router = express.Router({ mergeParams: true });
const { requireAdmin } = require('../middleware/auth');


const {
  getActivities,  // GET
  addActivity,     // POST
  deleteActivity,  // DELETE
} = require('../controllers/activityController');


// PUBLIC: list activities for a country
router.get('/', getActivities);

// ADMIN: create an activity on a country
router.post('/', requireAdmin, addActivity);

// ADMIN: delete an activity by id for a country
router.delete('/:activityId', requireAdmin, deleteActivity);

module.exports = router;
