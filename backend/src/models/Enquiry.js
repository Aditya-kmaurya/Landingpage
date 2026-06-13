import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDbStatus } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FALLBACK_FILE_PATH = path.join(__dirname, '../../data/enquiries.json');

// Ensure database fallback folder exists
const ensureFallbackDir = () => {
  const dir = path.dirname(FALLBACK_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// 1. MongoDB Schema definition using Mongoose
const EnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MongoEnquiry = mongoose.model('Enquiry', EnquirySchema);

// Local in-memory backup array in case disk writing is blocked
let inMemoryEnquiries = [];

// 2. Hybrid Enquiry handler
export const saveEnquiry = async (data) => {
  const isMongo = getDbStatus();

  if (isMongo) {
    // Save to MongoDB
    const newEnquiry = new MongoEnquiry(data);
    return await newEnquiry.save();
  } else {
    const newRecord = {
      _id: new mongoose.Types.ObjectId().toString(), // Generate a mock ObjectId for consistency
      ...data,
      createdAt: new Date().toISOString()
    };

    try {
      // Save to local JSON file fallback
      ensureFallbackDir();
      
      let enquiries = [];
      if (fs.existsSync(FALLBACK_FILE_PATH)) {
        try {
          const fileContent = fs.readFileSync(FALLBACK_FILE_PATH, 'utf-8');
          enquiries = JSON.parse(fileContent || '[]');
        } catch (err) {
          console.error('[Fallback DB] Error reading json file, resetting database:', err.message);
          enquiries = [];
        }
      }

      enquiries.push(newRecord);
      
      fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(enquiries, null, 2), 'utf-8');
      console.log(`[Fallback DB] Saved enquiry for ${data.name} to disk.`);
    } catch (fsError) {
      console.warn('[Fallback DB] Disk write failed (possibly read-only environment). Storing in memory fallback:');
      console.warn(fsError.message);
      
      // Store in memory so the API request still succeeds
      inMemoryEnquiries.push(newRecord);
      console.log(`[Fallback DB] Stored enquiry for ${data.name} in memory. Total in memory: ${inMemoryEnquiries.length}`);
    }

    return newRecord;
  }
};

// Export model for cases where someone needs direct schema access
export default MongoEnquiry;
