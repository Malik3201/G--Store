import { useState, useEffect } from 'react';
import api from '../../api/axios';
import Loader from '../../components/common/Loader';
import { formatCurrency } from '../../utils/formatCurrency';
import { FiBox, FiUsers, FiShoppingCart, FiCheckCircle } from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/dashboard');
        if (data.success) setStats(data.data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;
  if (!stats) return <div className="p-8 text-center text-gray-500">Failed to load dashboard data.</div>;

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: FiBox, gradient: 'from-blue-500 to-blue-600' },
    { title: 'Active Products', value: stats.activeProducts, icon: FiCheckCircle, gradient: 'from-emerald-500 to-emerald-600' },
    { title: 'Total Users', value: stats.totalUsers, icon: FiUsers, gradient: 'from-violet-500 to-violet-600' },
    { title: 'Total Orders', value: stats.totalOrders, icon: FiShoppingCart, gradient: 'from-amber-500 to-amber-600' },
  ];

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, Admin. Here's what's happening.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{card.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="py-3 px-5 font-medium">Order ID</th>
                <th className="py-3 px-5 font-medium">Customer</th>
                <th className="py-3 px-5 font-medium hidden sm:table-cell">Date</th>
                <th className="py-3 px-5 font-medium">Status</th>
                <th className="py-3 px-5 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats.recentOrders?.length > 0 ? (
                stats.recentOrders.map(order => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-xs text-gray-400">#{order._id.slice(-6).toUpperCase()}</td>
                    <td className="py-3.5 px-5">
                      <div className="font-medium text-gray-700 text-sm">{order.customer?.name}</div>
                      <div className="text-xs text-gray-400">{order.customer?.phone}</div>
                    </td>
                    <td className="py-3.5 px-5 text-gray-400 text-xs hidden sm:table-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-1 text-xs rounded-full bg-amber-100 text-amber-700 font-medium">{order.status.replace('_', ' ')}</span>
                    </td>
                    <td className="py-3.5 px-5 font-bold text-gray-800 text-right">{formatCurrency(order.total)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-400 text-sm">No recent orders</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
