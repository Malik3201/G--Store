const mongoose = require('mongoose');

const connectDB = async () => {
  const maxAttempts = 5;
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        family: 4,
        serverSelectionTimeoutMS: 10000,
      });
      console.log(`MongoDB connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      lastError = error;
      const waitMs = attempt * 2000;
      console.error(`MongoDB connection attempt ${attempt}/${maxAttempts} failed: ${error.message}`);
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, waitMs));
      }
    }
  }

  console.error(`MongoDB connection error after ${maxAttempts} attempts: ${lastError.message}`);
  process.exit(1);
};

module.exports = connectDB;
