import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useCallback, useMemo } from 'react';
import { useImageLoader } from '../hooks/useImageLoader';
import { 
  ANIMATION_VARIANTS, 
  APP_CONFIG, 
  PROJECT_STATUS, 
  PROJECT_CATEGORIES,
  ARIA_LABELS,
  IMAGE_ALT_TEXTS
} from '../constants';
import { handleError, formatText } from '../utils';
import mainPage from "../assets/ProjectImages/web-main.jpg"
import authPage from "../assets/ProjectImages/Authentication System.png"

// Optimized style component with proper semantic HTML
const StyleComponent = ({ header, mainHeader, subHeader }) => {
  if (mainHeader) {
    return (
      <h2 className="text-3xl font-heading font-bold mb-8 text-primary" role="heading" aria-level="2">
        {mainHeader}
      </h2>
    );
  }
  if (subHeader) {
    return (
      <h3 className="text-2xl font-subheading font-bold mb-6 text-primary" role="heading" aria-level="3">
        {subHeader}
      </h3>
    );
  }
  if (header) {
    return (
      <h4 className="text-xl font-subheading font-semibold mb-4 text-gray-800" role="heading" aria-level="4">
        {header}
      </h4>
    );
  }
  return null;
};

// Optimized description formatter with better accessibility
const formatDescription = (description) => {
  try {
    const formattedText = formatText(description);
    const lines = formattedText.split('\n');
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine === '') return null;
      
      if (trimmedLine.endsWith('Implementation')) {
        return <StyleComponent key={`main-${index}`} mainHeader={trimmedLine.replace('Implementation', '')} />;
      }
      
      if (trimmedLine.endsWith('Demonstrated:') || trimmedLine.endsWith('Applications:') || trimmedLine.endsWith('Achievements:')) {
        return <StyleComponent key={`sub-${index}`} subHeader={trimmedLine.replace(':', '')} />;
      }
      
      if (trimmedLine.endsWith(':')) {
        return <StyleComponent key={`header-${index}`} header={trimmedLine.replace(':', '')} />;
      }
      
      if (trimmedLine.startsWith('•')) {
        return (
          <li key={`list-${index}`} className="mb-2 text-gray-700 leading-relaxed pl-2">
            {trimmedLine.substring(1).trim()}
          </li>
        );
      }
      
      return (
        <p key={`para-${index}`} className="mb-4 text-gray-700 leading-relaxed">
          {trimmedLine}
        </p>
      );
    }).filter(Boolean);
  } catch (error) {
    console.error('Error formatting description:', error);
    return <p className="text-gray-700">Project description not available</p>;
  }
};

// Project Image Component with lazy loading and error handling
const ProjectImage = ({ imagePath, title, className = '' }) => {
  const { src, loading, error } = useImageLoader(
    imagePath?.replace('src/assets/', '') || 'ProjectImages/placeholder.svg'
  );

  if (loading) {
    return (
      <div className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}>
        <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  if (error || !src) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-gray-500">Project image</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${IMAGE_ALT_TEXTS.PROJECT_PLACEHOLDER} - ${title}`}
      className={className}
      loading="lazy"
      onError={(e) => {
        console.error(`Failed to load image for project: ${title}`);
        e.target.style.display = 'none';
      }}
    />
  );
};

const projectsData = [
  {
    id: 'ecommerce-website',
    title: 'E-commerce Website',
    subtitle: 'Modern Responsive Web Design & Mobile-First Platform',
    category: PROJECT_CATEGORIES.FULL_STACK,
    duration: '3 months',
    status: PROJECT_STATUS.COMPLETED,
    demoUrl: 'https://e-commerce-frontend-development.netlify.app',
    description: `Modern Responsive Web Design & Mobile-First E-commerce Platform

Core Features & Technical Implementation

Advanced Product Display Systems:
• Dynamic Grid View Layout: Interactive product showcases with hover effects and responsive grid systems optimized for e-commerce conversion
• Comprehensive List View: Detailed product listings featuring advanced filtering, sorting capabilities, and seamless user navigation
• Immersive Product Detail Pages: Full-featured product showcases with image galleries, specifications, and integrated shopping cart functionality
• Smart Category Navigation: Intuitive product organization across Clothing, Technology, and Interior Design with optimized user journey mapping

Professional E-commerce Functionality:
• Real-time Shopping Cart System: Dynamic cart management with quantity updates, price calculations, and checkout optimization
• Advanced Wishlist Integration: Persistent favorite product storage with user preference tracking and cross-device synchronization
• User Profile Dashboard: Complete account management system with order history, preferences, and personalized recommendations
• Streamlined Mobile Checkout: Mobile-optimized purchase flow designed for maximum conversion rates

Technical Skills & Expertise Demonstrated:

Frontend Development Mastery:
• HTML5 & CSS3: Modern semantic markup, advanced styling techniques, Flexbox, CSS Grid, and responsive design implementation
• JavaScript Integration: Interactive functionality, DOM manipulation, and dynamic content management
• UI/UX Design Principles: User-centered design approach with conversion optimization and accessibility standards (WCAG compliance)
• Performance Optimization: Core Web Vitals improvement, resource bundling, and loading speed enhancement techniques`,
    tech: ['HTML5', 'CSS3', 'JavaScript ES6+', 'CSS Grid & Flexbox', 'Responsive Design'],
    image: mainPage,
    features: [
      'Dynamic Product Showcase',
      'Shopping Cart System',
      'User Authentication',
      'Mobile-First Design',
      'SEO Optimization'
    ],
    highlights: [
      'Professional Internship Project',
      'Real-world Application',
      'Industry Standards',
      'Scalable Architecture'
    ]
  },
  {
    id: 'authentication-system',
    title: 'Authentication Page',
    subtitle: 'Secure User Authentication System with React & Node.js',
    category: PROJECT_CATEGORIES.FULL_STACK,
    duration: '3 months',
    status: PROJECT_STATUS.COMPLETED,
    description: `Modern Secure Authentication System with Full-Stack Implementation

Core Features & Technical Implementation

Authentication & Security:
• Secure User Registration: Email validation and strong password requirements enhance user data security
• JWT Authentication: Robust token-based authentication for secure user sessions and access control
• Password Recovery System: Efficient forgot password functionality with email-based reset links
• Protected Routes: Secure routing to restrict access to authenticated users only
• Google OAuth Integration: Seamless one-click sign-in experience with Google accounts

User Experience & Design:
• Responsive Design: Mobile-first approach with clean, modern UI for optimal experience on any device
• Comprehensive Form Validation: Client-side validation for all forms ensuring data integrity
• Advanced Error Handling: Clear user feedback mechanisms improving application reliability
• Beautiful Gradient UI: Modern design aesthetic with gradient backgrounds and smooth animations

Technical Architecture:
• React 18 & TypeScript: Modern frontend with static typing for enhanced code quality and maintainability
• Node.js & Express Backend: Fast, minimalist web framework with robust API endpoints
• MongoDB Integration: NoSQL database with elegant object modeling using Mongoose
• Comprehensive Testing: Jest and React Testing Library implementation for code quality assurance
• Professional Development Practices: ESLint configuration, proper project structure, and documentation

Professional Implementation:
• Built during TechnoHacks EduTech Official internship demonstrating real-world development experience
• Industry-standard security practices with bcrypt password hashing and JWT token management
• Scalable architecture supporting user management, email functionality, and OAuth integration
• Production-ready deployment with Vite bundler and optimized build processes`,
    tech: ['React 18', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Google OAuth', 'TailwindCSS', 'Jest', 'Vite'],
    image: authPage,
    features: [
      'Secure User Registration & Login',
      'JWT Token Authentication',
      'Google OAuth Integration',
      'Password Recovery System',
      'Protected Route Management',
      'Comprehensive Form Validation',
      'Responsive Mobile Design',
      'Advanced Error Handling'
    ],
    highlights: [
      'Professional Internship Project',
      'Full-Stack Development',
      'Industry Security Standards',
      'Modern Tech Stack',
      'Comprehensive Testing Coverage',
      'Production-Ready Architecture'
    ]
  },

];

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [expandedFeatures, setExpandedFeatures] = useState({});
  const [expandedTech, setExpandedTech] = useState({});

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => setSelectedProject(null);

  // Function to format description with proper headings
  const formatDescription = (description) => {
    const lines = description.split('\n');
    return lines.map((line, index) => {
      if (line.trim() === '') return null;
      
      // Check if line ends with colon (likely a heading)
      if (line.trim().endsWith(':')) {
        return (
          <StyleComponent key={index} header={line.trim().replace(':', '')}  />
        );
      }
      else if(line.trim().endsWith('Implementation')){
        return(
          <StyleComponent key={index} mainHeader={line.trim().replace('Implementation', '')}  />
        )
      }
      else if(line.trim().endsWith('Demonstrated:') || line.trim().endsWith('Applications:') || line.trim().endsWith('Achievements:')){
        return(
          <StyleComponent key={index} subHeader={line.trim().replace(':', '')}  />
        )
      }
      
      // Regular paragraph
      return (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
          {line.trim()}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Showcasing professional development experience and technical expertise through real-world applications
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group"
            >
              <div className="flex flex-col">
                {/* Image Section */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className=" relative w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-xs font-normal opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:scale-105"
                    >
                      ▶ Demo
                    </a>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-normal ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-normal">
                      {project.category}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {project.duration}
                    </span>
                  </div>
                  
                  
                  <h3 
                    id={`project-title-${project.id}`}
                    className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors duration-300"
                  >
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {project.subtitle}
                  </p>
                  
                  {/* Key Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-subheading font-semibold text-gray-900 mb-2">Key Features</h4>
                    <ul className="grid grid-cols-1 gap-1" role="list">
                      {(expandedFeatures[project.id] ? project.features : project.features.slice(0, APP_CONFIG.MAX_VISIBLE_ITEMS)).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2" role="listitem">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" aria-hidden="true"></span>
                          <span className="text-xs text-gray-700">{feature}</span>
                        </li>
                      ))}
                      {project.features.length > APP_CONFIG.MAX_VISIBLE_ITEMS && !expandedFeatures[project.id] && (
                         <li className="flex items-center gap-2" role="listitem">
                           <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" aria-hidden="true"></span>
                           <button 
                             onClick={() => setExpandedFeatures(prev => ({ ...prev, [project.id]: true }))}
                             className="text-xs text-primary hover:text-primary-600 underline cursor-pointer"
                           >
                             +{project.features.length - APP_CONFIG.MAX_VISIBLE_ITEMS} more features
                           </button>
                         </li>
                       )}
                       {project.features.length > APP_CONFIG.MAX_VISIBLE_ITEMS && expandedFeatures[project.id] && (
                         <li className="flex items-center gap-2" role="listitem">
                           <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" aria-hidden="true"></span>
                           <button 
                             onClick={() => setExpandedFeatures(prev => ({ ...prev, [project.id]: false }))}
                             className="text-xs text-primary hover:text-primary-600 underline cursor-pointer"
                           >
                             Show less
                           </button>
                         </li>
                       )}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="sr-only">Technologies Used</h4>
                    <div className="flex flex-wrap gap-1" role="list" aria-label="Technologies Used">
                      {(expandedTech[project.id] ? project.tech : project.tech.slice(0, APP_CONFIG.MAX_VISIBLE_ITEMS)).map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-normal"
                          role="listitem"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > APP_CONFIG.MAX_VISIBLE_ITEMS && !expandedTech[project.id] && (
                        <button 
                          onClick={() => setExpandedTech(prev => ({ ...prev, [project.id]: true }))}
                          className="text-xs text-primary hover:text-primary-600 underline cursor-pointer px-2 py-1"
                          role="listitem"
                        >
                          +{project.tech.length - APP_CONFIG.MAX_VISIBLE_ITEMS} more
                        </button>
                      )}
                      {project.tech.length > APP_CONFIG.MAX_VISIBLE_ITEMS && expandedTech[project.id] && (
                        <button 
                          onClick={() => setExpandedTech(prev => ({ ...prev, [project.id]: false }))}
                          className="text-xs text-primary hover:text-primary-600 underline cursor-pointer px-2 py-1"
                          role="listitem"
                        >
                          Show less
                        </button>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => handleProjectSelect(project)}
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-4 rounded-lg font-body hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label={`${ARIA_LABELS.VIEW_PROJECT_DETAILS} ${project.title}`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Professional Project Details Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl focus:outline-none"
            >
              {/* Modal Header with Image */}
              <div className="relative h-64 bg-gradient-to-r from-primary-500 to-secondary-500">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-6 right-6">
                  <button
                    onClick={closeModal}
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label={ARIA_LABELS.CLOSE_MODAL}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      selectedProject.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-100 border border-green-400/30' 
                        : 'bg-blue-500/20 text-blue-100 border border-blue-400/30'
                    }`}>
                      {selectedProject.status}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/30">
                      {selectedProject.category}
                    </span>
                  </div>
                  <h3 
                    id="modal-title"
                    className="text-4xl font-heading font-bold text-white mb-2"
                  >
                    {selectedProject.title}
                  </h3>
                  <p className="text-xl text-white/90 font-subheading">
                    {selectedProject.subtitle}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-16rem)]">
                <div className="p-8">
                  {/* Project Overview */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Main Description */}
                    <div className="lg:col-span-2">
                      <h4 className="text-2xl font-subheading font-bold text-gray-900 mb-4">Project Overview</h4>
                      <div className="prose prose-gray max-w-none font-body text-gray-700 leading-relaxed">
                        {formatDescription(selectedProject.description)}
                      </div>
                    </div>

                    {/* Project Details Sidebar */}
                    <div className="space-y-6">
                      {/* Duration & Status */}
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h5 className="font-subheading font-semibold text-gray-900 mb-4">Project Details</h5>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Duration</span>
                            <p className="font-body text-gray-900">{selectedProject.duration}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Category</span>
                            <p className="font-body text-gray-900">{selectedProject.category}</p>
                          </div>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
                        <h5 className="font-subheading font-semibold text-gray-900 mb-4">Technologies Used</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((tech, index) => (
                            <span
                              key={index}
                              className="bg-white text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm border border-gray-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Features */}
                      {selectedProject.features && (
                        <div className="bg-green-50 rounded-xl p-6">
                          <h5 className="font-subheading font-semibold text-gray-900 mb-4">Key Features</h5>
                          <ul className="space-y-2">
                            {selectedProject.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2 font-body text-gray-700">
                                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Highlights */}
                      {selectedProject.highlights && (
                        <div className="bg-yellow-50 rounded-xl p-6">
                          <h5 className="font-subheading font-semibold text-gray-900 mb-4">Project Highlights</h5>
                          <ul className="space-y-2">
                            {selectedProject.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start gap-2 font-body text-gray-700">
                                <svg className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;