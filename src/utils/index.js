import { CACHE_CONFIG, ERROR_MESSAGES } from '../constants';

// Cache utility for storing and retrieving data
class CacheManager {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttl = CACHE_CONFIG.DEFAULT_TTL) {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { value, expiry });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  clear() {
    this.cache.clear();
  }

  delete(key) {
    this.cache.delete(key);
  }
}

export const cache = new CacheManager();

// Debounce utility function
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Throttle utility function
export const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func.apply(null, args);
    }
  };
};

// Dynamic image import utility
export const importImage = async (imagePath) => {
  try {
    const cacheKey = `image_${imagePath}`;
    const cached = cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    const module = await import(`../assets/${imagePath}`);
    const imageUrl = module.default;
    
    cache.set(cacheKey, imageUrl, CACHE_CONFIG.IMAGES_TTL);
    return imageUrl;
  } catch (error) {
    console.error(`Failed to load image: ${imagePath}`, error);
    return null;
  }
};

// Safe JSON parse utility
export const safeJsonParse = (jsonString, fallback = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON parse error:', error);
    return fallback;
  }
};

// Local storage utilities with error handling
export const storage = {
  get: (key, fallback = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? safeJsonParse(item, fallback) : fallback;
    } catch (error) {
      console.error('LocalStorage get error:', error);
      return fallback;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('LocalStorage set error:', error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('LocalStorage remove error:', error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('LocalStorage clear error:', error);
      return false;
    }
  }
};

// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

export const validateMinLength = (value, minLength) => {
  return value && value.toString().length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return !value || value.toString().length <= maxLength;
};

// Error handling utilities
export const handleError = (error, context = '') => {
  console.error(`Error in ${context}:`, error);
  
  // Log to external service in production
  if (process.env.NODE_ENV === 'production') {
    // Here you would integrate with error tracking service like Sentry
    // Sentry.captureException(error, { extra: { context } });
  }
  
  return {
    message: ERROR_MESSAGES.GENERIC,
    details: process.env.NODE_ENV === 'development' ? error.message : null
  };
};

// Async wrapper with error handling
export const asyncWrapper = async (asyncFunction, context = '') => {
  try {
    return await asyncFunction();
  } catch (error) {
    return handleError(error, context);
  }
};

// Format text utility for descriptions
export const formatText = (text) => {
  if (!text) return '';
  
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
};

// Scroll utilities
export const scrollToElement = (elementId, offset = 0) => {
  try {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  } catch (error) {
    console.error('Scroll to element error:', error);
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Device detection utilities
export const isMobile = () => {
  return window.innerWidth <= 768;
};

export const isTablet = () => {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
};

export const isDesktop = () => {
  return window.innerWidth > 1024;
};

// Performance utilities
export const measurePerformance = (name, fn) => {
  return async (...args) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name} took ${end - start} milliseconds`);
    }
    
    return result;
  };
};

// URL utilities
export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const getBaseUrl = () => {
  return `${window.location.protocol}//${window.location.host}`;
};

// Array utilities
export const chunk = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const shuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Date utilities
export const formatDate = (date, locale = 'ar-SA') => {
  try {
    return new Intl.DateTimeFormat(locale).format(new Date(date));
  } catch (error) {
    console.error('Date formatting error:', error);
    return date;
  }
};

export const getRelativeTime = (date, locale = 'ar-SA') => {
  try {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    const now = new Date();
    const target = new Date(date);
    const diffInSeconds = (target - now) / 1000;
    const diffInDays = Math.round(diffInSeconds / (60 * 60 * 24));
    
    return rtf.format(diffInDays, 'day');
  } catch (error) {
    console.error('Relative time formatting error:', error);
    return formatDate(date, locale);
  }
};