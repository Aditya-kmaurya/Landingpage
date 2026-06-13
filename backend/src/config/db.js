import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kidrove';
  
  console.log(`[Database] Attempting to connect to MongoDB at: ${mongoUri.split('@').pop()}`);
  
  try {
    // Set a lower timeout so the server boot isn't blocked too long if MongoDB is offline
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000, 
    });
    isMongoConnected = true;
    console.log('[Database] MongoDB connected successfully.');
  } catch (error) {
    isMongoConnected = false;
    console.warn('\n========================================================================');
    console.warn('[WARNING] MongoDB connection failed:');
    console.warn(error.message);
    console.warn('[FALLBACK] The backend will store registrations in: backend/data/enquiries.json');
    console.warn('========================================================================\n');
  }
};

export const getDbStatus = () => isMongoConnected;
