const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate({
    path: 'items.product',
    select: 'title slug images price discountPrice'
  });

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  res.json({ success: true, data: cart });
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1, customization } = req.body;

  if (quantity < 1) {
    res.status(400);
    throw new Error('Quantity must be at least 1');
  }

  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    res.status(404);
    throw new Error('Product not found or inactive');
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const priceSnapshot = product.discountPrice !== null && product.discountPrice !== undefined ? product.discountPrice : product.price;

  // We could check if item exists with exact same customization, but to keep it simple, we just push
  cart.items.push({
    product: productId,
    quantity,
    customization,
    priceSnapshot
  });

  cart.subtotal = cart.items.reduce((acc, item) => acc + (item.priceSnapshot * item.quantity), 0);
  cart.total = cart.subtotal;

  await cart.save();

  cart = await cart.populate({
    path: 'items.product',
    select: 'title slug images price discountPrice'
  });

  res.json({ success: true, message: 'Added to cart', data: cart });
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { itemId } = req.params;

  if (quantity < 1) {
    res.status(400);
    throw new Error('Quantity must be at least 1');
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const item = cart.items.id(itemId);
  if (!item) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  item.quantity = quantity;
  cart.subtotal = cart.items.reduce((acc, i) => acc + (i.priceSnapshot * i.quantity), 0);
  cart.total = cart.subtotal;

  await cart.save();

  cart = await cart.populate({
    path: 'items.product',
    select: 'title slug images price discountPrice'
  });

  res.json({ success: true, message: 'Cart updated', data: cart });
});

const removeCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items.pull({ _id: itemId });
  cart.subtotal = cart.items.reduce((acc, i) => acc + (i.priceSnapshot * i.quantity), 0);
  cart.total = cart.subtotal;

  await cart.save();

  cart = await cart.populate({
    path: 'items.product',
    select: 'title slug images price discountPrice'
  });

  res.json({ success: true, message: 'Item removed', data: cart });
});

const clearCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = [];
  cart.subtotal = 0;
  cart.total = 0;

  await cart.save();

  res.json({ success: true, message: 'Cart cleared', data: cart });
});

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
