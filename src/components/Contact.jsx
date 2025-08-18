
import { useInView } from 'react-intersection-observer';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  ANIMATION_VARIANTS, 
  APP_CONFIG, 
  ARIA_LABELS, 
  ERROR_MESSAGES, 
  SUCCESS_MESSAGES,
  VALIDATION_RULES 
} from '../constants';
import { 
  handleError, 
  validateEmail, 
  validateRequired, 
  validateMinLength,
  validateMaxLength 
} from '../utils';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: APP_CONFIG.SCROLL_THRESHOLD,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [errors, setErrors] = useState({});

  const validateField = useCallback((name, value) => {
    const fieldErrors = {};
    
    switch (name) {
      case 'name':
        if (!validateRequired(value)) {
          fieldErrors.name = ERROR_MESSAGES.REQUIRED_FIELD;
        } else if (!validateMinLength(value, VALIDATION_RULES.NAME.MIN_LENGTH)) {
          fieldErrors.name = ERROR_MESSAGES.MIN_LENGTH.replace('{min}', VALIDATION_RULES.NAME.MIN_LENGTH);
        } else if (!validateMaxLength(value, VALIDATION_RULES.NAME.MAX_LENGTH)) {
          fieldErrors.name = ERROR_MESSAGES.MAX_LENGTH.replace('{max}', VALIDATION_RULES.NAME.MAX_LENGTH);
        }
        break;
      case 'email':
        if (!validateRequired(value)) {
          fieldErrors.email = ERROR_MESSAGES.REQUIRED_FIELD;
        } else if (!validateEmail(value)) {
          fieldErrors.email = ERROR_MESSAGES.INVALID_EMAIL;
        }
        break;
      case 'message':
        if (!validateRequired(value)) {
          fieldErrors.message = ERROR_MESSAGES.REQUIRED_FIELD;
        } else if (!validateMinLength(value, VALIDATION_RULES.MESSAGE.MIN_LENGTH)) {
          fieldErrors.message = ERROR_MESSAGES.MIN_LENGTH.replace('{min}', VALIDATION_RULES.MESSAGE.MIN_LENGTH);
        } else if (!validateMaxLength(value, VALIDATION_RULES.MESSAGE.MAX_LENGTH)) {
          fieldErrors.message = ERROR_MESSAGES.MAX_LENGTH.replace('{max}', VALIDATION_RULES.MESSAGE.MAX_LENGTH);
        }
        break;
    }
    
    return fieldErrors;
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const formErrors = {};
    
    Object.keys(formData).forEach(field => {
      const fieldErrors = validateField(field, formData[field]);
      Object.assign(formErrors, fieldErrors);
    });
    
    return formErrors;
  }, [formData, validateField]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('');
    setErrors({});

    try {
      // Get EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      // Debug logging for environment variables
      console.log('EmailJS Config:', {
        serviceId: serviceId ? 'Set' : 'Missing',
        templateId: templateId ? 'Set' : 'Missing',
        publicKey: publicKey ? 'Set' : 'Missing'
      });
      
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration missing. Please check your .env file.');
      }
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'talebhussein17@gmail.com'
      };

      console.log('Sending email with params:', templateParams);
      
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      console.log('EmailJS response:', result);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Announce success to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = SUCCESS_MESSAGES.MESSAGE_SENT;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
      
    } catch (error) {
      console.error('EmailJS Error Details:', {
        message: error.message,
        status: error.status,
        text: error.text,
        fullError: error
      });
      handleError(error, 'Contact form submission failed');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  return (
    <section 
      id="contact" 
      className="py-20 bg-gray-50"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={ANIMATION_VARIANTS.fadeInUp.initial}
          animate={inView ? ANIMATION_VARIANTS.fadeInUp.animate : {}}
          transition={{ duration: APP_CONFIG.ANIMATION_DURATION }}
          className="text-center mb-12"
        >
          <h2 
            id="contact-heading"
            className="text-4xl font-bold mb-4"
          >
            {ARIA_LABELS.CONTACT_SECTION}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto" aria-hidden="true"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            initial={ANIMATION_VARIANTS.fadeInUp.initial}
            animate={inView ? ANIMATION_VARIANTS.fadeInUp.animate : {}}
            transition={{ duration: APP_CONFIG.ANIMATION_DURATION, delay: 0.2 }}
            className="space-y-6"
            noValidate
            aria-describedby="form-description"
          >
            <div id="form-description" className="sr-only">
              Contact form to send a direct message
            </div>
            <div>
              <label 
                htmlFor="name" 
                className="block text-gray-700 font-normal mb-2"
              >
                Name 
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                  errors.name 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Your full name"
                required
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                autoComplete="name"
              />
              {errors.name && (
                <div 
                  id="name-error" 
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.name}
                </div>
              )}
            </div>
            <div>
              <label 
                htmlFor="email" 
                className="block text-gray-700 font-normal mb-2"
              >
                Email 
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                  errors.email 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="your@email.com"
                required
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
              {errors.email && (
                <div 
                  id="email-error" 
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.email}
                </div>
              )}
            </div>
            <div>
              <label 
                htmlFor="message" 
                className="block text-gray-700 font-normal mb-2"
              >
                Message 
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-vertical ${
                  errors.message 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Write your message here..."
                required
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
                minLength={VALIDATION_RULES.MESSAGE.MIN_LENGTH}
                maxLength={VALIDATION_RULES.MESSAGE.MAX_LENGTH}
              ></textarea>
              {errors.message && (
                <div 
                  id="message-error" 
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.message}
                </div>
              )}
              <div className="mt-1 text-xs text-gray-500">
                {formData.message.length}/{VALIDATION_RULES.MESSAGE.MAX_LENGTH} characters
              </div>
            </div>
            {submitStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {SUCCESS_MESSAGES.MESSAGE_SENT}
                </div>
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                role="alert"
                aria-live="assertive"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {ERROR_MESSAGES.SEND_FAILED}
                </div>
              </motion.div>
            )}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 bg-[#2699EC] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
                  : 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg'
              }`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              aria-describedby={isSubmitting ? 'submit-status' : undefined}
            >
              <span className="flex items-center justify-center ">
                {isSubmitting && (
                  <svg 
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </span>
              {isSubmitting && (
                <span id="submit-status" className="sr-only">
                  Sending message, please wait
                </span>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;