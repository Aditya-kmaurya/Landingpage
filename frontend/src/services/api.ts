export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const submitEnquiry = async (payload: EnquiryPayload): Promise<EnquiryResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/enquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Validation failed',
        errors: data.errors,
      };
    }

    return {
      success: true,
      message: data.message || 'Registration submitted successfully',
    };
  } catch (error) {
    console.error('[API Service Error]', error);
    return {
      success: false,
      message: 'Failed to connect to the server. Please check your connection and try again.',
    };
  }
};
