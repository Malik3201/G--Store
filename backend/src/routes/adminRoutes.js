const express = require('express');
const {
  getSettings,
  updateSettings,
  getDashboardStats
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, admin);

router.get('/settings', getSettings);
router.put('/settings', updateSettings);
router.get('/dashboard', getDashboardStats);

module.exports = router;
