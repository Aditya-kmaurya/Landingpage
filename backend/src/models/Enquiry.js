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

// 2. Hybrid Enquiry handler
export const saveEnquiry = async (data) => {
  const isMongo = getDbStatus();

  if (isMongo) {
    // Save to MongoDB
    const newEnquiry = new MongoEnquiry(data);
    return await newEnquiry.save();
  } else {
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

    const newRecord = {
      _id: new mongoose.Types.ObjectId().toString(), // Generate a mock ObjectId for consistency
      ...data,
      createdAt: new Date().toISOString()
    };

    enquiries.push(newRecord);
    
    fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(enquiries, null, 2), 'utf-8');
    console.log(`[Fallback DB] Saved enquiry for ${data.name} to: ${FALLBACK_FILE_PATH}`);
    return newRecord;
  }
};

// Export model for cases where someone needs direct schema access
export default MongoEnquiry;
