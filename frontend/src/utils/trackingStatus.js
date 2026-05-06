export const TRACKING_STATUSES = [
  { value: 'order_received', label: 'Order Received' },
  { value: 'order_confirmed', label: 'Order Confirmed' },
  { value: 'preparing_parcel', label: 'Preparing Parcel' },
  { value: 'packed', label: 'Packed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'out_for_delivery', label: 'Out for Delivery' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

export const TRACKING_STATUS_LABELS = {
  order_received: 'Order Received',
  whatsapp_pending: 'Order Received',
  order_confirmed: 'Order Confirmed',
  confirmed: 'Order Confirmed',
  preparing_parcel: 'Preparing Parcel',
  processing: 'Preparing Parcel',
  packed: 'Packed',
  shipped: 'Shipped',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const TRACKING_STATUS_COLORS = {
  order_received: 'bg-amber-100 text-amber-700',
  whatsapp_pending: 'bg-amber-100 text-amber-700',
  order_confirmed: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-blue-100 text-blue-700',
  preparing_parcel: 'bg-purple-100 text-purple-700',
  processing: 'bg-purple-100 text-purple-700',
  packed: 'bg-fuchsia-100 text-fuchsia-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  out_for_delivery: 'bg-cyan-100 text-cyan-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-600',
};
