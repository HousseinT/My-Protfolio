import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import technoHacksLogo from '../assets/technohacks-logo.svg';
import developersHubLogo from '../assets/developershub-logo.svg';

const workExperienceData = [
  
  {
    company: "TechnoHacks EduTech Official",
    position: "Full-stack Developer",
    period: "Apr 2025 - May 2025  2 mos",
    logo: technoHacksLogo,
    description: [
      "Architected and deployed a full-stack authentication system using React 18, TypeScript, and Node.js with Express, integrating JWT-based security protocols and MongoDB database for secure user management and session handling",
      "Built comprehensive user authentication features including registration, login, password recovery, and Google OAuth integration, achieving seamless one-click sign-in functionality and reducing user onboarding time by 45%",
      "Designed responsive UI components with TailwindCSS and implemented protected routing mechanisms using React Router v7, ensuring mobile-first accessibility and secure access control across all application endpoints",
      "Established robust testing infrastructure with Jest and React Testing Library coverage exceeding 85%, implementing automated validation systems and error handling mechanisms that improved application reliability and user experience metrics"
    ]
  },
  {
    company: "DevelopersHub Corporation©",
    position: "Front End Developer",
    period: "Mar 2025 - May 2025  3 mos",
    logo: developersHubLogo,
    description: [
      "Developed and optimized a comprehensive e-commerce frontend platform using HTML5, CSS3, and responsive design principles, implementing multiple product view layouts (Grid, List, Detailed) with cross-browser compatibility",
      "Engineered reusable UI components for product listings, shopping cart, and user profile systems across multiple categories (Clothing, Tech, Interior Design), improving code maintainability and user experience by 40%",
      "Implemented mobile-first responsive design architecture with SVG graphics optimization and asset management, resulting in 40% faster page load times and improved SEO performance across all devices",
      "Built comprehensive navigation system with custom iconography, social media integration, and international support featuring multiple country flags, enhancing global user accessibility and engagement rates"
    ]
  }
];

const WorkExperience = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-heading font-bold mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
          
          {workExperienceData.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative mb-12 ${index % 2 === 0 ? 'md:ml-auto md:mr-auto md:pr-12 md:pl-0' : 'md:mr-auto md:ml-auto md:pl-12 md:pr-0'} md:w-1/2 w-full px-4`}
            >
              <div className="bg-white p-6 rounded-lg shadow-md relative  before:absolute before:inset-0 before:rounded-lg hover:scale-110 transition-all duration-300 ease-in ">
                {/* Timeline dot with company logo */}
                <div className="absolute top-6 md:top-6 -right-4 md:right-auto md:-left-4 w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center z-10 shadow-md ">
                  <img src={job.logo} alt={`${job.company} logo`} className="w-6 h-6 rounded" />
                </div>
                
                <h3 className="relative z-10 text-xl font-subheading font-semibold text-gray-900">{job.company}</h3>
                <h4 className="text-lg font-subheading font-medium text-primary mb-2">{job.position}</h4>
                <p className="text-sm font-body text-gray-500 mb-4">{job.period}</p>
                
                <ul className="space-y-2">
                  {job.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-gray-600 font-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;