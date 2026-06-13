import { saveEnquiry } from '../models/Enquiry.js';

// Regex for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex for phone number validation
// Matches optional country code, spaces, hyphens, and 10 to 15 digits
const phoneRegex = /^\+?[\d\s-]{10,15}$/;

export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const errors = {};

    // Validate fields
    if (!name || name.trim() === '') {
      errors.name = 'Full name is required';
    }

    if (!email || email.trim() === '') {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!phone || phone.trim() === '') {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      errors.phone = 'Please enter a valid phone number (10-15 digits)';
    }

    // Check if there are validation errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Save registration
    await saveEnquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
    });

    // Success response
    return res.status(201).json({
      success: true,
      message: 'Registration submitted successfully'
    });

  } catch (error) {
    console.error('[Enquiry API Error] Fail to submit registration:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later.'
    });
  }
};
