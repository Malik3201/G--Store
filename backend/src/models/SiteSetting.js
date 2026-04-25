const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: 'G Store' },
    adminWhatsappNumber: { type: String, default: '' },
    currency: { type: String, default: 'PKR' },
    deliveryNote: { type: String, default: '' },
    homepageHeroTitle: { type: String, default: '' },
    homepageHeroSubtitle: { type: String, default: '' },
    homepageAnnouncement: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSetting', siteSettingSchema);
