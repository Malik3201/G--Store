const express = require('express');
const { checkoutWhatsapp, getAdminOrders } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/checkout-whatsapp', checkoutWhatsapp);
router.get('/admin', admin, getAdminOrders);

module.exports = router;
