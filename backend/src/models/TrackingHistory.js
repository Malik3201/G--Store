const mongoose = require('mongoose');
const { TRACKING_STATUS_ORDER } = require('../utils/trackingStatus');

const trackingHistorySchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: TRACKING_STATUS_ORDER,
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    adminNote: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TrackingHistory', trackingHistorySchema);
