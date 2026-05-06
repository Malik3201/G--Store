const express = require('express');
const {
  checkoutWhatsapp,
  getAdminOrders,
  getAdminOrderById,
  updateAdminOrder,
  updateOrderStatus,
  getOrderByTrackingId,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/track/:trackingId', getOrderByTrackingId);

router.use(protect);
router.post('/checkout-whatsapp', checkoutWhatsapp);
router.get('/admin', admin, getAdminOrders);
router.get('/admin/:id', admin, getAdminOrderById);
router.put('/admin/:id', admin, updateAdminOrder);
router.patch('/admin/:id/status', admin, updateOrderStatus);

module.exports = router;
