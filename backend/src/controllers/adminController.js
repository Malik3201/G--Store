const SiteSetting = require('../models/SiteSetting');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get site settings
// @route   GET /api/admin/settings
// @access  Private/Admin
const getSettings = asyncHandler(async (req, res) => {
  let settings = await SiteSetting.findOne();
  if (!settings) {
    settings = await SiteSetting.create({});
  }
  res.json({ success: true, data: settings });
});

// @desc    Update site settings
// @route   PUT /api/admin/settings
// @access  Private/Admin
const updateSettings = asyncHandler(async (req, res) => {
  const {
    storeName, adminWhatsappNumber, currency, deliveryNote,
    homepageHeroTitle, homepageHeroSubtitle, homepageAnnouncement
  } = req.body;

  let settings = await SiteSetting.findOne();
  if (!settings) {
    settings = await SiteSetting.create({});
  }

  if (storeName !== undefined) settings.storeName = storeName;
  if (adminWhatsappNumber !== undefined) settings.adminWhatsappNumber = adminWhatsappNumber;
  if (currency !== undefined) settings.currency = currency;
  if (deliveryNote !== undefined) settings.deliveryNote = deliveryNote;
  if (homepageHeroTitle !== undefined) settings.homepageHeroTitle = homepageHeroTitle;
  if (homepageHeroSubtitle !== undefined) settings.homepageHeroSubtitle = homepageHeroSubtitle;
  if (homepageAnnouncement !== undefined) settings.homepageAnnouncement = homepageAnnouncement;

  await settings.save();
  res.json({ success: true, message: 'Settings updated', data: settings });
});

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const activeProducts = await Product.countDocuments({ isActive: true });
  const totalUsers = await User.countDocuments({ role: 'user' });
  const totalOrders = await Order.countDocuments();
  
  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name email');

  res.json({
    success: true,
    data: {
      totalProducts,
      activeProducts,
      totalUsers,
      totalOrders,
      recentOrders
    }
  });
});

module.exports = { getSettings, updateSettings, getDashboardStats };
