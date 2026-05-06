const TRACKING_STATUS = {
  ORDER_RECEIVED: 'order_received',
  ORDER_CONFIRMED: 'order_confirmed',
  PREPARING_PARCEL: 'preparing_parcel',
  PACKED: 'packed',
  SHIPPED: 'shipped',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  WHATSAPP_PENDING: 'whatsapp_pending',
  CONFIRMED_LEGACY: 'confirmed',
  PROCESSING_LEGACY: 'processing',
};

const TRACKING_STATUS_ORDER = [
  TRACKING_STATUS.ORDER_RECEIVED,
  TRACKING_STATUS.WHATSAPP_PENDING,
  TRACKING_STATUS.ORDER_CONFIRMED,
  TRACKING_STATUS.CONFIRMED_LEGACY,
  TRACKING_STATUS.PREPARING_PARCEL,
  TRACKING_STATUS.PACKED,
  TRACKING_STATUS.PROCESSING_LEGACY,
  TRACKING_STATUS.SHIPPED,
  TRACKING_STATUS.OUT_FOR_DELIVERY,
  TRACKING_STATUS.DELIVERED,
  TRACKING_STATUS.CANCELLED,
];

const TRACKING_MESSAGES = {
  [TRACKING_STATUS.ORDER_RECEIVED]: 'Your order has been received and is waiting for confirmation.',
  [TRACKING_STATUS.WHATSAPP_PENDING]: 'Your order has been received and is waiting for confirmation.',
  [TRACKING_STATUS.ORDER_CONFIRMED]: 'Your order has been confirmed by our team.',
  [TRACKING_STATUS.CONFIRMED_LEGACY]: 'Your order has been confirmed by our team.',
  [TRACKING_STATUS.PREPARING_PARCEL]: 'Your parcel is being prepared for dispatch.',
  [TRACKING_STATUS.PACKED]: 'Your parcel has been packed and is ready for shipment.',
  [TRACKING_STATUS.PROCESSING_LEGACY]: 'Your parcel is being prepared for dispatch.',
  [TRACKING_STATUS.SHIPPED]: 'Your parcel has been handed over for delivery.',
  [TRACKING_STATUS.OUT_FOR_DELIVERY]: 'Your parcel is out for delivery and will reach you soon.',
  [TRACKING_STATUS.DELIVERED]: 'Your parcel has been successfully delivered. Thank you for shopping with us.',
  [TRACKING_STATUS.CANCELLED]: 'This order has been cancelled. Please contact support for more details.',
};

const TRACKING_LABELS = {
  [TRACKING_STATUS.ORDER_RECEIVED]: 'Order Received',
  [TRACKING_STATUS.WHATSAPP_PENDING]: 'Order Received',
  [TRACKING_STATUS.ORDER_CONFIRMED]: 'Order Confirmed',
  [TRACKING_STATUS.CONFIRMED_LEGACY]: 'Order Confirmed',
  [TRACKING_STATUS.PREPARING_PARCEL]: 'Preparing Parcel',
  [TRACKING_STATUS.PACKED]: 'Packed',
  [TRACKING_STATUS.PROCESSING_LEGACY]: 'Preparing Parcel',
  [TRACKING_STATUS.SHIPPED]: 'Shipped',
  [TRACKING_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [TRACKING_STATUS.DELIVERED]: 'Delivered',
  [TRACKING_STATUS.CANCELLED]: 'Cancelled',
};

module.exports = {
  TRACKING_STATUS,
  TRACKING_STATUS_ORDER,
  TRACKING_MESSAGES,
  TRACKING_LABELS,
};
