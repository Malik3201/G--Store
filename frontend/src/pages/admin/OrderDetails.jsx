import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/axios';
import Loader from '../../components/common/Loader';
import { formatCurrency } from '../../utils/formatCurrency';
import { resolveImageUrl } from '../../utils/resolveImageUrl';
import { TRACKING_STATUSES, TRACKING_STATUS_COLORS, TRACKING_STATUS_LABELS } from '../../utils/trackingStatus';
import toast from 'react-hot-toast';

const OrderDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [status, setStatus] = useState('order_received');
  const [adminNote, setAdminNote] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/admin/${id}`);
      if (data.success) {
        setOrder(data.data.order);
        setTimeline(data.data.trackingHistory || []);
        setStatus(data.data.order.status);
      }
    } catch {
      toast.error('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStatusUpdate = async () => {
    setUpdating(true);
    try {
      await api.patch(`/orders/admin/${id}/status`, { status, adminNote });
      toast.success('Status updated and timeline recorded');
      setAdminNote('');
      await fetchOrder();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;
  if (!order) return <div className="p-8 text-gray-500">Order not found.</div>;

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-800">Order Details</h1>
          <p className="text-sm text-gray-500 mt-1">Tracking ID: <span className="font-mono">{order.trackingId || 'Not generated'}</span></p>
        </div>
        <Link to="/admin/orders" className="text-sm font-medium text-primary hover:text-accent">← Back to Orders</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-800 mb-4">Products</h2>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <img src={resolveImageUrl(item.product?.images?.[0])} alt={item.product?.title} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.product?.title || 'Product removed'}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-500">Line Total: {formatCurrency(item.quantity * item.priceSnapshot)}</p>
                  {item.customization?.printedName && <p className="text-xs text-gray-400">Name: {item.customization.printedName}</p>}
                  {item.customization?.customText && <p className="text-xs text-gray-400">Text: {item.customization.customText}</p>}
                  {item.customization?.mugColor && <p className="text-xs text-gray-400">Color: {item.customization.mugColor}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-5">
          <div>
            <h2 className="font-bold text-gray-800 mb-3">Customer</h2>
            <p className="font-semibold text-gray-800">{order.customer?.name}</p>
            <p className="text-sm text-gray-500">{order.customer?.phone}</p>
            <p className="text-sm text-gray-500">{order.customer?.email || 'N/A'}</p>
            <p className="text-sm text-gray-500 mt-2">{order.customer?.address}</p>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <h2 className="font-bold text-gray-800 mb-3">Order Summary</h2>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Subtotal: <span className="font-semibold text-gray-800">{formatCurrency(order.subtotal)}</span></p>
              <p>Total: <span className="font-semibold text-gray-800">{formatCurrency(order.total)}</span></p>
              <p>Status: <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${TRACKING_STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}>{TRACKING_STATUS_LABELS[order.status] || order.status}</span></p>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-bold text-gray-800 mb-4">Update Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="input-field">
            {TRACKING_STATUSES.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
          <input
            type="text"
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            placeholder="Optional admin note"
            className="input-field md:col-span-2"
          />
        </div>
        <button onClick={handleStatusUpdate} disabled={updating} className="btn-primary mt-4">
          {updating ? 'Updating...' : 'Update Status'}
        </button>
      </section>

      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-bold text-gray-800 mb-4">Tracking Timeline</h2>
        <div className="relative pl-5">
          <div className="absolute left-[8px] top-1 bottom-1 w-[2px] bg-gray-200" />
          <div className="space-y-4">
            {timeline.map((event) => (
              <article key={event._id} className="relative pl-5">
                <span className="absolute left-[-1px] top-1 w-4 h-4 rounded-full bg-accent border-2 border-white shadow" />
                <p className="font-semibold text-gray-800">{TRACKING_STATUS_LABELS[event.status] || event.status}</p>
                <p className="text-sm text-gray-500 mt-1">{event.message}</p>
                {event.adminNote && <p className="text-sm text-gray-600 mt-1">Note: {event.adminNote}</p>}
                <p className="text-xs text-gray-400 mt-1">{new Date(event.createdAt).toLocaleString()}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;
