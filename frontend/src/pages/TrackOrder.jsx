import { useState } from 'react';
import api from '../api/axios';
import { resolveImageUrl } from '../utils/resolveImageUrl';
import { TRACKING_STATUS_COLORS, TRACKING_STATUS_LABELS } from '../utils/trackingStatus';
import { formatCurrency } from '../utils/formatCurrency';
import { FiSearch } from 'react-icons/fi';

const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    const cleanId = trackingId.trim();
    if (!cleanId) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const { data } = await api.get(`/orders/track/${encodeURIComponent(cleanId)}`);
      if (data.success) setResult(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'No order found for this Tracking ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-[70vh] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h1 className="text-3xl font-serif font-bold text-primary">Track Your Order</h1>
          <p className="text-text-light mt-2">Enter your tracking ID shared by our team (example: TRK-2026-000123).</p>

          <form onSubmit={handleTrack} className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
              placeholder="Enter tracking ID"
              className="input-field uppercase"
            />
            <button type="submit" disabled={loading} className="btn-primary inline-flex items-center justify-center gap-2 px-6">
              <FiSearch size={16} />
              {loading ? 'Checking...' : 'Track Order'}
            </button>
          </form>

          {error && <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">{error}</p>}
        </div>

        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold text-gray-800">Tracking {result.order.trackingId}</h2>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TRACKING_STATUS_COLORS[result.order.status] || 'bg-gray-100 text-gray-700'}`}>
                  {TRACKING_STATUS_LABELS[result.order.status] || result.order.status}
                </span>
              </div>

              <div className="relative pl-5 mt-6">
                <div className="absolute left-[8px] top-1 bottom-1 w-[2px] bg-gray-200" />
                <div className="space-y-5">
                  {(result.trackingHistory || []).map((event) => (
                    <article key={event._id} className="relative pl-5">
                      <span className="absolute left-[-1px] top-1 w-4 h-4 rounded-full bg-accent border-2 border-white shadow" />
                      <h3 className="font-semibold text-gray-800">{TRACKING_STATUS_LABELS[event.status] || event.status}</h3>
                      <p className="text-sm text-gray-500 mt-1">{event.message}</p>
                      {event.adminNote && <p className="text-sm text-gray-600 mt-1">Note: {event.adminNote}</p>}
                      <p className="text-xs text-gray-400 mt-1">{new Date(event.createdAt).toLocaleString()}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Customer Details</h3>
                <p className="text-sm text-gray-600">{result.order.customer?.name || 'N/A'}</p>
                <p className="text-sm text-gray-600">{result.order.customer?.phone || 'N/A'}</p>
                <p className="text-sm text-gray-600">{result.order.customer?.email || 'N/A'}</p>
                <p className="text-sm text-gray-600 mt-1">{result.order.customer?.address || 'N/A'}</p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-bold text-gray-800 mb-3">Order Items</h3>
                <div className="space-y-3">
                  {result.order.items?.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <img
                        src={resolveImageUrl(item.product?.images?.[0])}
                        alt={item.product?.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">{item.product?.title || 'Product'}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 text-sm text-gray-600">
                <p>Subtotal: <span className="font-semibold text-gray-800">{formatCurrency(result.order.subtotal)}</span></p>
                <p>Total: <span className="font-semibold text-gray-800">{formatCurrency(result.order.total)}</span></p>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
