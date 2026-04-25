/**
 * Builds a pre-filled WhatsApp message URL for order notifications.
 * The phone number must include the country code without '+' or spaces.
 */
const buildWhatsAppOrderUrl = (order, phoneNumber) => {
  const lines = [
    `*New Order – G Store*`,
    `Order ID: ${order._id}`,
    `Customer: ${order.shippingAddress.fullName}`,
    `Items:`,
    ...order.orderItems.map(
      (item) => `  - ${item.name} x${item.quantity} (Rs. ${item.price})`
    ),
    `Total: Rs. ${order.totalPrice}`,
    `Payment: ${order.paymentMethod}`,
    `Address: ${order.shippingAddress.address}, ${order.shippingAddress.city}`,
  ];

  const message = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${phoneNumber}?text=${message}`;
};

module.exports = { buildWhatsAppOrderUrl };
