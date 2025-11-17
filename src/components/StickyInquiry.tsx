import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { validatePhoneNumber } from '../utils/phoneUtils';
import { submitLeadToAnarock } from '../utils/anarockApi';

const StickyInquiry: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError('');
      try {
        const result = await submitLeadToAnarock({
          ...formData,
          message: '',
          interested: 'sales',
        });
        if (result.success) {
          setIsSubmitted(true);
          setFormData({ name: '', email: '', phone: '' });
          setTimeout(() => setIsSubmitted(false), 4000);
        } else {
          setSubmitError(result.message || 'Failed to submit inquiry. Please try again.');
        }
      } catch (error) {
        setSubmitError('Network error. Please check your connection and try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const phoneNumber = '+919518800700';

  return (
    <>
      {/* Desktop Version */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1A1815] shadow-lg z-30 border-t border-[#3A3835] hidden md:block">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-white font-medium">Enquire or call us:</span>
              <a 
                href={`tel:${phoneNumber}`}
                className="font-semibold hover:text-[#D26A3B] transition-colors duration-300 flex items-center text-[#D26A3B]"
              >
                <Phone className="h-4 w-4 mr-2" />
                {phoneNumber}
              </a>
            </div>
            <form onSubmit={handleSubmit} className="flex-1 flex items-center justify-end gap-4 max-w-3xl">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`flex-1 px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-[#3A3835]'} bg-[#2A2825] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#D26A3B] placeholder-white/60`}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`flex-1 px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-[#3A3835]'} bg-[#2A2825] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#D26A3B] placeholder-white/60`}
                required
              />
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white py-2 px-6 rounded-md hover:bg-[#B85A2B] transition-colors duration-300 whitespace-nowrap"
                style={{background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)'}}
              >
                {isSubmitting ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></span>
                ) : null}
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
          {/* Error/Success Feedback */}
          <div className="flex justify-end mt-2 max-w-3xl ml-auto">
            {isSubmitted && (
              <div className="bg-green-600/10 border border-green-600/20 rounded-md p-2 text-green-400 text-sm mr-2">Thank you! Your inquiry has been submitted.</div>
            )}
            {submitError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-md p-2 text-red-400 text-sm">{submitError}</div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden" style={{background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)'}}>
        <div className="grid grid-cols-2" style={{height: '60px'}}>
          <a
            href={`tel:${phoneNumber}`}
            className="text-white py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-300 hover:bg-black hover:bg-opacity-10"
          >
            <Phone className="h-5 w-5" />
            Call Us
          </a>
          <a
            href="#contact"
            className="text-white py-3 px-4 flex items-center justify-center transition-colors duration-300 hover:bg-black hover:bg-opacity-10"
          >
            Enquire Now
          </a>
        </div>
      </div>
    </>
  );
};

export default StickyInquiry;