const mongoose = require('mongoose');
const { TRACKING_STATUS, TRACKING_STATUS_ORDER } = require('../utils/trackingStatus');

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    customization: {
      printedName: { type: String, default: '' },
      customText: { type: String, default: '' },
      mugColor: { type: String, default: '' },
    },
    priceSnapshot: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      email: { type: String },
    },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    trackingId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      uppercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: TRACKING_STATUS_ORDER,
      default: TRACKING_STATUS.ORDER_RECEIVED,
    },
    whatsappMessage: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
