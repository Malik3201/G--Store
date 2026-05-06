const TrackingCounter = require('../models/TrackingCounter');

const generateTrackingId = async () => {
  const year = new Date().getFullYear();
  const key = `tracking_${year}`;

  const counter = await TrackingCounter.findOneAndUpdate(
    { key },
    { $inc: { sequence: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  const sequence = String(counter.sequence).padStart(6, '0');
  return `TRK-${year}-${sequence}`;
};

module.exports = { generateTrackingId };
