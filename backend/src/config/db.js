const mongoose = require('mongoose');

let connectionPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  const maxAttempts = 5;
  let lastError;

  connectionPromise = (async () => {
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
          family: 4,
          serverSelectionTimeoutMS: 10000,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn.connection;
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
    throw lastError;
  })();

  try {
    return await connectionPromise;
  } finally {
    connectionPromise = null;
  }
};

module.exports = connectDB;
