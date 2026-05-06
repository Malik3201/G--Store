const Order = require('../models/Order');
const Cart = require('../models/Cart');
const SiteSetting = require('../models/SiteSetting');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');
const TrackingHistory = require('../models/TrackingHistory');
const { generateTrackingId } = require('../utils/trackingId');
const { TRACKING_STATUS, TRACKING_MESSAGES, TRACKING_STATUS_ORDER } = require('../utils/trackingStatus');

const ensureTrackingId = async (order) => {
  if (!order.trackingId) {
    order.trackingId = await generateTrackingId();
  }
};

const ensureInitialHistory = async (order) => {
  const existing = await TrackingHistory.countDocuments({ order: order._id });
  if (existing === 0) {
    await TrackingHistory.create({
      order: order._id,
      status: order.status || TRACKING_STATUS.ORDER_RECEIVED,
      message: TRACKING_MESSAGES[order.status] || TRACKING_MESSAGES[TRACKING_STATUS.ORDER_RECEIVED],
      createdAt: order.createdAt,
      updatedAt: order.createdAt,
    });
  }
};

const checkoutWhatsapp = asyncHandler(async (req, res) => {
  // 1. Get user cart
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  
  // 2. Validate cart is not empty
  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error('Your cart is empty');
  }

  // 3. Validate user profile has name, address, phone
  const user = await User.findById(req.user._id);
  if (!user.name || !user.address || !user.phone) {
    res.status(400);
    throw new Error('Please update your profile with name, phone, and address before checkout');
  }

  // 4. Get admin WhatsApp number
  const settings = await SiteSetting.findOne();
  const adminWhatsappNumber = settings?.adminWhatsappNumber || '';
  const storeName = settings?.storeName || 'G Store';

  if (!adminWhatsappNumber) {
    res.status(400);
    throw new Error('Admin WhatsApp number is not configured. Please contact support.');
  }

  // calculate subtotal and total
  let subtotal = 0;
  const orderItems = [];

  cart.items.forEach(item => {
    const product = item.product;
    const price = product.discountPrice !== null && product.discountPrice !== undefined ? product.discountPrice : product.price;
    subtotal += price * item.quantity;

    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      customization: item.customization,
      priceSnapshot: price
    });
  });

  const total = subtotal; // add shipping logic if needed, keeping it simple

  // 5. Create formatted WhatsApp message
  let message = `*New Order - ${storeName}*\n\n`;
  message += `*Customer Details:*\n`;
  message += `Name: ${user.name}\n`;
  message += `Phone: ${user.phone}\n`;
  message += `Address: ${user.address}\n\n`;
  message += `*Order Items:*\n`;

  cart.items.forEach((item, index) => {
    const product = item.product;
    const price = product.discountPrice !== null && product.discountPrice !== undefined ? product.discountPrice : product.price;
    const lineTotal = price * item.quantity;
    
    message += `${index + 1}. *${product.title}*\n`;
    message += `   Quantity: ${item.quantity}\n`;
    message += `   Price: Rs. ${price}\n`;
    
    if (item.customization) {
      if (item.customization.printedName) message += `   Printed Name: ${item.customization.printedName}\n`;
      if (item.customization.customText) message += `   Custom Text: ${item.customization.customText}\n`;
      if (item.customization.mugColor) message += `   Mug Color: ${item.customization.mugColor}\n`;
    }
    
    message += `   Subtotal: Rs. ${lineTotal}\n\n`;
  });

  message += `*Grand Total: Rs. ${total}*\n`;
  message += `\nThank you for shopping with ${storeName}!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${adminWhatsappNumber}?text=${encodedMessage}`;

  const trackingId = await generateTrackingId();

  // 6. Create Order record
  const order = await Order.create({
    user: user._id,
    items: orderItems,
    customer: {
      name: user.name,
      phone: user.phone,
      address: user.address,
      email: user.email
    },
    subtotal,
    total,
    trackingId,
    status: TRACKING_STATUS.ORDER_RECEIVED,
    whatsappMessage: message
  });

  await TrackingHistory.create({
    order: order._id,
    status: TRACKING_STATUS.ORDER_RECEIVED,
    message: TRACKING_MESSAGES[TRACKING_STATUS.ORDER_RECEIVED],
  });

  // Clear the cart
  await Cart.findOneAndUpdate({ user: req.user._id }, { items: [], subtotal: 0, total: 0 });

  // 7. Return
  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: {
      order,
      whatsappUrl
    }
  });
});

const getAdminOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate('user', 'name email')
    .populate('items.product', 'title images');
  
  res.json({ success: true, data: orders });
});

const getAdminOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email phone address')
    .populate('items.product', 'title slug images price discountPrice');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  await ensureTrackingId(order);
  await order.save();
  await ensureInitialHistory(order);
  const trackingHistory = await TrackingHistory.find({ order: order._id }).sort({ createdAt: 1 });
  res.json({ success: true, data: { order, trackingHistory } });
});

const updateAdminOrder = asyncHandler(async (req, res) => {
  const { customer, items, subtotal, total } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (customer) {
    order.customer = {
      ...order.customer,
      ...customer,
    };
  }

  if (Array.isArray(items) && items.length > 0) {
    order.items = items;
  }

  if (subtotal !== undefined) order.subtotal = subtotal;
  if (total !== undefined) order.total = total;

  await ensureTrackingId(order);
  const updatedOrder = await order.save();
  res.json({ success: true, message: 'Order updated successfully', data: updatedOrder });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, adminNote = '' } = req.body;

  if (!TRACKING_STATUS_ORDER.includes(status)) {
    res.status(422);
    throw new Error('Invalid order status');
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  await ensureTrackingId(order);
  order.status = status;
  await order.save();

  const history = await TrackingHistory.create({
    order: order._id,
    status,
    message: TRACKING_MESSAGES[status],
    adminNote,
  });

  res.json({
    success: true,
    message: 'Order status updated successfully',
    data: { order, history },
  });
});

const getOrderByTrackingId = asyncHandler(async (req, res) => {
  const trackingId = String(req.params.trackingId || '').trim().toUpperCase();
  const order = await Order.findOne({ trackingId })
    .populate('items.product', 'title slug images')
    .populate('user', 'name email phone address');

  if (!order) {
    res.status(404);
    throw new Error('No order found for this Tracking ID.');
  }

  await ensureTrackingId(order);
  await order.save();
  await ensureInitialHistory(order);
  const trackingHistory = await TrackingHistory.find({ order: order._id }).sort({ createdAt: 1 });
  res.json({
    success: true,
    data: {
      order,
      trackingHistory,
    },
  });
});

module.exports = {
  checkoutWhatsapp,
  getAdminOrders,
  getAdminOrderById,
  updateAdminOrder,
  updateOrderStatus,
  getOrderByTrackingId,
};
