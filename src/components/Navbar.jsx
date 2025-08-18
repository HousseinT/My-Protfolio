import { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = ["Home", "About", "Experience", "Skills", "Projects", "Contact"];

  const handleNavClick = useCallback((section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  }, [setActiveSection]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="fixed top-0 left-0 right-0 bg-white/100 backdrop-blur-sm z-50 shadow-sm  bg-white-100 mx-auto "
    >
      <div className="max-w-7xl mx-auto  px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <motion.span
              className="text-xl sm:text-2xl md:text-3xl font-normal gradient-bg"
              whileHover={{ scale: 1.05 }}
            >
              <span className="hidden sm:inline">Houssein Taleb</span>
              <span className="sm:hidden">Houssein.T</span>
            </motion.span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4 md:space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm md:text-base font-body text-gray-700 hover:text-primary hover:font-bold hover:text-[#2699EC]  transition-colors ${
                  activeSection === item.toLowerCase() ? "text-primary" : ""
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(item.toLowerCase())}
              >
                {item}
              </motion.a>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <div className="w-5 h-0.5 bg-gray-700 mb-1 transition-all duration-300"></div>
              <div className="w-5 h-0.5 bg-gray-700 mb-1 transition-all duration-300"></div>
              <div className="w-5 h-0.5 bg-gray-700 transition-all duration-300"></div>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 rounded-b-lg shadow-lg"
          >
            <div className="px-3 py-3 space-y-1">
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block py-3 px-4 rounded-lg text-base font-normal transition-all duration-200 ${
                    activeSection === item.toLowerCase() 
                      ? "bg-primary/10 text-primary border-l-4 border-primary" 
                      : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                  }`}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavClick(item.toLowerCase())}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default memo(Navbar);
