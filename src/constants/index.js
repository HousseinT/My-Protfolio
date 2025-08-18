// Application Constants
export const APP_CONFIG = {
  ANIMATION_DURATION: 0.6,
  STAGGER_DELAY: 0.1,
  SCROLL_THRESHOLD: 0.1,
  MAX_VISIBLE_ITEMS: 3,
  MODAL_Z_INDEX: 50
};

// Color scheme constants
export const COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#10B981',
  DARK: '#1F2937',
  LIGHT: '#F9FAFB',
  ERROR: '#EF4444',
  WARNING: '#F59E0B',
  SUCCESS: '#10B981'
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px'
};

// Animation variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: APP_CONFIG.ANIMATION_DURATION }
    }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: APP_CONFIG.ANIMATION_DURATION }
    }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: APP_CONFIG.ANIMATION_DURATION }
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: APP_CONFIG.STAGGER_DELAY
      }
    }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: APP_CONFIG.ANIMATION_DURATION }
    }
  }
};

// Navigation sections
export const NAVIGATION_SECTIONS = {
  HOME: 'home',
  ABOUT: 'about',
  EXPERIENCE: 'experience',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  CONTACT: 'contact'
};

// Project status options
export const PROJECT_STATUS = {
  COMPLETED: 'Completed',
  IN_PROGRESS: 'In Progress',
  PLANNING: 'Planning',
  MAINTENANCE: 'Maintenance'
};

// Project categories
export const PROJECT_CATEGORIES = {
  WEB_DEVELOPMENT: 'Web Development',
  MOBILE_APP: 'Mobile Applications',
  DESKTOP_APP: 'Desktop Applications',
  API: 'APIs',
  OTHER: 'Other'
};

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Connection error. Please check your internet connection.',
  VALIDATION: 'Please check the entered data.',
  NOT_FOUND: 'The requested item was not found.',
  PERMISSION: 'You do not have permission to access this content.',
  UNAUTHORIZED: 'Unauthorized access',
  SERVER_ERROR: 'Server error',
  SEND_FAILED: 'Failed to send message. Please try again or contact me directly.',
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  MIN_LENGTH: 'Must contain at least {min} characters',
  MAX_LENGTH: 'Must not exceed {max} characters'
};

// Success messages
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Form submitted successfully!',
  DATA_SAVED: 'Data saved successfully!',
  EMAIL_SENT: 'Email sent successfully!',
  SAVED: 'Saved successfully',
  UPDATED: 'Updated successfully',
  DELETED: 'Deleted successfully',
  SENT: 'Sent successfully',
  MESSAGE_SENT: 'Message sent successfully! I will contact you soon.'
};

// Accessibility labels
export const ARIA_LABELS = {
  NAVIGATION: 'Main navigation',
  MAIN_CONTENT: 'Main content',
  CLOSE_MODAL: 'Close modal',
  VIEW_PROJECT: 'View project details',
  DEMO_LINK: 'Demo link',
  CONTACT_FORM: 'Contact form',
  SOCIAL_LINKS: 'Social media links',
  MENU_TOGGLE: 'Toggle menu',
  SCROLL_TO_TOP: 'Scroll to top',
  FEATURED_PROJECTS: 'Featured projects',
  VIEW_PROJECT_DETAILS: 'View project details',
  DEMO_BUTTON: 'Demo The Project',
  PROJECT_IMAGE: 'Project Image',
  NAVIGATION_MENU: 'Navigation Menu',
  SKIP_TO_CONTENT: 'Skip to Content',
  CONTACT_SECTION: 'Get In Touch',
  LOADING: 'Loading',
  ERROR: 'Error',
  SUCCESS: 'Success',
  WARNING: 'Warning'
};

// Image alt texts
export const IMAGE_ALT_TEXTS = {
  PROFILE: 'Profile picture',
  PROJECT_PLACEHOLDER: 'Project illustration',
  COMPANY_LOGO: 'Company logo',
  TECH_ICON: 'Technology icon'
};

// Form validation rules
export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MESSAGE: 'Please enter a valid email address'
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50
  },
  MESSAGE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 500
  },
  REQUIRED: {
    MESSAGE: 'This field is required'
  },
  MIN_LENGTH: {
    MESSAGE: 'Must contain at least {min} characters'
  },
  MAX_LENGTH: {
    MESSAGE: 'Must not exceed {max} characters'
  }
};

// Cache configuration
export const CACHE_CONFIG = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  IMAGES_TTL: 24 * 60 * 60 * 1000, // 24 hours
  API_TTL: 10 * 60 * 1000 // 10 minutes
};

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  LAZY_LOAD_OFFSET: '100px',
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100
};