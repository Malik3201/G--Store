import { useState, useEffect } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';

const Settings = () => {
  const [formData, setFormData] = useState({
    storeName: '',
    adminWhatsappNumber: '',
    currency: '',
    deliveryNote: '',
    homepageHeroTitle: '',
    homepageHeroSubtitle: '',
    homepageAnnouncement: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/admin/settings');
        if (data.success && data.data) {
          setFormData({
            storeName: data.data.storeName || '',
            adminWhatsappNumber: data.data.adminWhatsappNumber || '',
            currency: data.data.currency || 'PKR',
            deliveryNote: data.data.deliveryNote || '',
            homepageHeroTitle: data.data.homepageHeroTitle || '',
            homepageHeroSubtitle: data.data.homepageHeroSubtitle || '',
            homepageAnnouncement: data.data.homepageAnnouncement || ''
          });
        }
      } catch (error) {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/admin/settings', formData);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-primary mb-8">Store Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        
        <div>
          <h3 className="font-bold text-primary mb-4 pb-2 border-b border-gray-100">General Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Store Name</label>
              <input type="text" name="storeName" value={formData.storeName} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Currency Code</label>
              <input type="text" name="currency" value={formData.currency} onChange={handleChange} className="input-field" placeholder="e.g. PKR, USD" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-primary mb-4 pb-2 border-b border-gray-100 mt-6">WhatsApp Integration</h3>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Admin WhatsApp Number</label>
            <input type="text" name="adminWhatsappNumber" value={formData.adminWhatsappNumber} onChange={handleChange} className="input-field" placeholder="923001234567" />
            <p className="text-xs text-text-light mt-2">Enter number with country code, without + sign. Example: 923001234567. All customer orders will be sent to this number.</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-primary mb-4 pb-2 border-b border-gray-100 mt-6">Storefront Customization</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Homepage Announcement (Top Bar)</label>
              <input type="text" name="homepageAnnouncement" value={formData.homepageAnnouncement} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Hero Title</label>
              <input type="text" name="homepageHeroTitle" value={formData.homepageHeroTitle} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Hero Subtitle</label>
              <textarea name="homepageHeroSubtitle" rows="2" value={formData.homepageHeroSubtitle} onChange={handleChange} className="input-field resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Delivery Note (Checkout)</label>
              <textarea name="deliveryNote" rows="2" value={formData.deliveryNote} onChange={handleChange} className="input-field resize-none" />
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button type="submit" disabled={saving} className="btn-primary w-full md:w-auto">
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
