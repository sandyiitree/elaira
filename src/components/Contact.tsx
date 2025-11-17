import React, { useState, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { validatePhoneNumber } from '../utils/phoneUtils';
import { submitLeadToAnarock } from '../utils/anarockApi';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interested: 'sales'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    
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
        const result = await submitLeadToAnarock(formData);
        
        if (result.success) {
          setIsSubmitted(true);
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            interested: 'sales'
          });
        } else {
          setSubmitError(result.message || 'Failed to submit inquiry. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError('Network error. Please check your connection and try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const contactInfo = [
    { icon: <Phone className="h-5 w-5" />, text: "+91 1234 567 890" }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-[#1A1815]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Contact <span className="font-bold" style={{background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Us</span>
          </h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)'}}></div>
          <p className="text-white/80 max-w-2xl mx-auto">
            Interested in experiencing luxury living at Elaira Residences? Get in touch with our sales team today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="bg-[#2A2825] p-8 rounded-lg shadow-lg border border-[#3A3835] h-full">
              <h3 className="text-2xl font-bold mb-8 text-white">Get in Touch</h3>
              
              <div className="space-y-6 mb-10">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="p-3 rounded-full mr-4" style={{background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)'}}>
                      {item.icon}
                    </div>
                    <span className="text-white/80">{item.text}</span>
                  </div>
                ))}
              </div>
              
  
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {isSubmitted ? (
              <div className="bg-[#2A2825] p-8 rounded-lg shadow-lg border border-[#3A3835] h-full flex flex-col items-center justify-center text-center">
                <div className="p-4 rounded-full text-white mb-6" style={{background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Thank You!</h3>
                <p className="text-white/80 mb-6">
                  Your inquiry has been successfully submitted. Our team will contact you soon.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)} 
                  className="bg-[#D26A3B] hover:bg-[#B85A2B] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#2A2825] p-8 rounded-lg shadow-lg border border-[#3A3835]">
                <h3 className="text-2xl font-bold mb-6 text-white">Inquire Now</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">Full Name*</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D26A3B] bg-[#1A1815] text-white placeholder-white/60 ${
                        errors.name ? 'border-red-500' : 'border-[#3A3835]'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  
                  
                  <div>
                    <label htmlFor="phone" className="block text-white font-medium mb-2">Phone Number*</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D26A3B] bg-[#1A1815] text-white placeholder-white/60 ${
                        errors.phone ? 'border-red-500' : 'border-[#3A3835]'
                      }`}
                      placeholder="Your phone number"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="interested" className="block text-white font-medium mb-2">I'm interested in</label>
                    <select
                      id="interested"
                      name="interested"
                      value={formData.interested}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#3A3835] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D26A3B] bg-[#1A1815] text-white"
                    >
                      <option value="sales">Sales Inquiry</option>
                      <option value="site-visit">Schedule a Site Visit</option>
                      <option value="brochure">Request Brochure</option>
                      <option value="other">Other Information</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-[#3A3835] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D26A3B] bg-[#1A1815] text-white placeholder-white/60"
                      placeholder="Tell us more about your requirements..."
                    />
                  </div>
                  
                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3">
                      <p className="text-red-400 text-sm">{submitError}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-semibold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center ${
                      isSubmitting 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-[#D26A3B] hover:bg-[#B85A2B]'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Inquiry
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;