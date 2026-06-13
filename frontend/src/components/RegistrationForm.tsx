import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitEnquiry } from '../services/api';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { User, Mail, Phone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = (name: string, value: string): string => {
    let error = '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,15}$/;

    if (name === 'name') {
      if (!value || value.trim() === '') {
        error = 'Full name is required';
      } else if (value.trim().length < 2) {
        error = 'Name must be at least 2 characters';
      }
    }

    if (name === 'email') {
      if (!value || value.trim() === '') {
        error = 'Email address is required';
      } else if (!emailRegex.test(value.trim())) {
        error = 'Please enter a valid email address';
      }
    }

    if (name === 'phone') {
      if (!value || value.trim() === '') {
        error = 'Phone number is required';
      } else if (!phoneRegex.test(value.trim().replace(/\s+/g, ''))) {
        error = 'Please enter a valid phone number (10-15 digits)';
      }
    }

    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error dynamically on change if valid
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error ? error : undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Run validation across all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors before submitting.');
      return;
    }

    // Clear error cache and trigger loader
    setErrors({});
    setIsLoading(true);

    // Call API
    const response = await submitEnquiry(formData);

    setIsLoading(false);

    if (response.success) {
      setIsSuccess(true);
      toast.success('Registration successful! Check your email.');
      
      // Celebrate with confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#06b6d4', '#10b981'],
      });

      // Clear form
      setFormData({ name: '', email: '', phone: '' });
    } else {
      // Backend validation error fallback
      if (response.errors) {
        setErrors(response.errors);
      }
      toast.error(response.message || 'Validation failed. Please review fields.');
    }
  };

  return (
    <section id="register" className="py-20 relative overflow-hidden flex items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 rounded-full radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text/Value Pitch Left */}
          <div className="lg:col-span-6 text-left space-y-6 sm:space-y-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary bg-brand-secondary/10 px-3 py-1 rounded-full">
              Reserve Your Spot
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white leading-tight">
              Ready to Start the{' '}
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                STEM Adventure?
              </span>
            </h2>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed max-w-xl">
              Fill out the enquiry form with your contact details. Our admissions advisor will contact you within **24 hours** to complete the enrollment process and issue your student portal credentials.
            </p>

            {/* Checklist of benefits */}
            <ul className="space-y-4 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 font-medium">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>Free Trial Access (Day 1)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>Certified Course Completion Badge</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
                  ✓
                </div>
                <span>1-on-1 Mentor Support & Project Showcase</span>
              </li>
            </ul>
          </div>

          {/* Form Card Right */}
          <div className="lg:col-span-6">
            <motion.div
              layout
              className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 shadow-2xl relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="registration-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-zinc-950 dark:text-white">
                        Enquiry Registration
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                        Secure your seats for the July 15 batch.
                      </p>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                          <User className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          disabled={isLoading}
                          className={`block w-full pl-11 pr-4 py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all ${
                            errors.name
                              ? 'border-rose-500 focus:ring-rose-500/20'
                              : 'border-zinc-200 dark:border-zinc-800/80 focus:border-brand-primary focus:ring-brand-primary/25'
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                          <Mail className="w-5 h-5" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="parent@example.com"
                          disabled={isLoading}
                          className={`block w-full pl-11 pr-4 py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all ${
                            errors.email
                              ? 'border-rose-500 focus:ring-rose-500/20'
                              : 'border-zinc-200 dark:border-zinc-800/80 focus:border-brand-primary focus:ring-brand-primary/25'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                          <Phone className="w-5 h-5" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="9876543210"
                          disabled={isLoading}
                          className={`block w-full pl-11 pr-4 py-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all ${
                            errors.phone
                              ? 'border-rose-500 focus:ring-rose-500/20'
                              : 'border-zinc-200 dark:border-zinc-800/80 focus:border-brand-primary focus:ring-brand-primary/25'
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 rounded-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary-hover hover:to-brand-secondary-hover text-white text-base shadow-md shadow-brand-primary/10 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting Registration...</span>
                        </>
                      ) : (
                        <span>Submit Registration</span>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                    className="flex flex-col items-center justify-center text-center py-8 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-zinc-950 dark:text-white">
                        Registration Received!
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm">
                        Thank you for enrolling! We have registered your details and sent a confirmation check to your inbox.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 rounded-xl font-medium bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 transition-all cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
