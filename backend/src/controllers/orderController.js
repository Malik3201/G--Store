const Order = require('../models/Order');
const Cart = require('../models/Cart');
const SiteSetting = require('../models/SiteSetting');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

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
    status: 'whatsapp_pending',
    whatsappMessage: message
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
    .populate('user', 'name email');
  
  res.json({ success: true, data: orders });
});

module.exports = { checkoutWhatsapp, getAdminOrders };
