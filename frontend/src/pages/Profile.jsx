import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { FiUser, FiPhone, FiMapPin, FiMail, FiInfo, FiSave } from 'react-icons/fi';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/profile');
        if (data.success) {
          setFormData({
            name: data.data.name || '',
            phone: data.data.phone || '',
            address: data.data.address || '',
            email: data.data.email || ''
          });
        }
      } catch (error) {
        toast.error('Failed to fetch profile');
      } finally {
        setFetching(false);
      }
    };
    if (user) fetchProfile();
  }, [user]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put('/users/profile', {
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      });
      if (data.success) toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const isProfileComplete = formData.name && formData.phone && formData.address;

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#3E2723] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E2723]">My Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your account details and delivery information</p>
        </div>

        {/* Profile Completeness */}
        <div className={`mb-6 p-4 rounded-2xl flex items-start gap-3 ${isProfileComplete ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
          <FiInfo className={`mt-0.5 flex-shrink-0 ${isProfileComplete ? 'text-emerald-600' : 'text-amber-600'}`} size={18} />
          <div>
            <p className={`text-sm font-semibold ${isProfileComplete ? 'text-emerald-800' : 'text-amber-800'}`}>
              {isProfileComplete ? 'Profile complete — ready for checkout!' : 'Complete your profile to enable WhatsApp checkout'}
            </p>
            <p className={`text-xs mt-0.5 ${isProfileComplete ? 'text-emerald-600' : 'text-amber-600'}`}>
              Your name, phone, and address are used to auto-fill your order receipt.
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Avatar area */}
          <div className="bg-gradient-to-r from-[#3E2723] to-[#5D4037] px-6 py-8 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C4A882]/20 border-2 border-[#C4A882]/40 flex items-center justify-center flex-shrink-0">
              <FiUser size={28} className="text-[#C4A882]" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">{formData.name || 'Your Name'}</p>
              <p className="text-white/60 text-sm">{formData.email}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Email (readonly) */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                <FiMail size={12} /> Email Address
              </label>
              <input
                type="email"
                readOnly
                value={formData.email}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-400 text-sm cursor-not-allowed"
              />
            </div>

            {/* Name */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <FiUser size={12} /> Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C4A882] transition-colors text-sm bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <FiPhone size={12} /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 03001234567"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C4A882] transition-colors text-sm bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Address */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <FiMapPin size={12} /> Delivery Address
              </label>
              <textarea
                name="address"
                required
                rows="3"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your complete delivery address..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#C4A882] transition-colors text-sm bg-gray-50 focus:bg-white resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#3E2723] text-white rounded-xl font-semibold text-sm hover:bg-[#5D4037] transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Saving...</>
              ) : (
                <><FiSave size={16} /> Save Changes</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
