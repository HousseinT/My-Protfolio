import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "../assets/tech-icons/React.svg";
import javascript from "../assets/tech-icons/javascript.svg";
import typescript  from "../assets/tech-icons/typescript.svg";
import html5 from "../assets/tech-icons/html5.svg";
import css3 from "../assets/tech-icons/css3.svg";
import tailwindcss from"../assets/tech-icons/tailwindcss.svg"
import responsive from "../assets/tech-icons/responsive.svg"
import vite from "../assets/tech-icons/vite.svg"
import nodeJs from "../assets/tech-icons/nodejs.svg"
import expressJs from "../assets/tech-icons/expressjs.svg"
import mongodb from "../assets/tech-icons/mongodb.svg"
import jwt from "../assets/tech-icons/jwt.svg"
import api from "../assets/tech-icons/api.svg"
import git from "../assets/tech-icons/git.svg"
import jest from "../assets/tech-icons/jest.svg"
import eslint from "../assets/tech-icons/eslint.svg"
import npm from "../assets/tech-icons/npm.svg"
import yarn from "../assets/tech-icons/yarn.svg"
import postcss from "../assets/tech-icons/postcss.svg"
import java from "../assets/tech-icons/java.svg"
import php from "../assets/tech-icons/php.svg"
import python from "../assets/tech-icons/python.svg"

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-heading font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-subheading font-medium mb-4">Professional Journey</h3>
            <p className="text-gray-600 font-body leading-relaxed">
            My path as a <strong>full-stack web developer</strong> began at the Higher Orthodox Vocational Institute, where I discovered my passion for crafting <strong>React.js applications</strong> and <strong>responsive web design</strong>. What started as curiosity about <strong>JavaScript frameworks</strong> quickly grew into hands-on expertise building real solutions for complex problems.
            </p>
            <p className="text-gray-600 font-body leading-relaxed">
            During my internship at <strong>DevelopersHub Corporation</strong>, I developed a complete <strong>e-commerce platform</strong> featuring <strong>shopping cart systems</strong>, <strong>product catalogs</strong>, and <strong>mobile-first design</strong>. This project taught me how <strong>Tailwind CSS</strong> and clean architecture create seamless user experiences across all devices.
            </p>
            <p className="text-gray-600 font-body leading-relaxed">
            At <strong>TechnoHacks EduTech Official</strong>, I built a comprehensive <strong>authentication system</strong> using <strong>JWT security</strong>, <strong>Google OAuth integration</strong>, and <strong>Node.js backend services</strong>. Working with <strong>MongoDB</strong> and <strong>Express.js</strong> deepened my understanding of full-stack development and <strong>secure user management</strong>.
            </p>
            <p className="text-gray-600 font-body leading-relaxed">
            My current toolkit combines <strong>React 18</strong>,<strong> TypeScript</strong>, and <strong>Framer Motion</strong> for engaging frontends, while leveraging <strong>modern API integration</strong> and <strong>performance optimization</strong> techniques. I focus on creating <strong>user-centric applications</strong> that balance visual appeal with technical reliability, continuously exploring emerging technologies to deliver innovative solutions.
            </p>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4 mt-4">
                <h3 className="w-full text-lg font-subheading font-semibold mb-2">Frontend Technologies</h3>
                {[
                  { icon: React, name: 'React', color: '#00D8FF'  },
                  { icon: javascript, name: 'ES6+', color: '#F7DF1E', secondColor:'#000000' },
                  { icon: typescript, name: 'TypeScript', color: '#3178C6' },
                  { icon: html5, name: 'HTML', color: '#E34F26' },
                  { icon: css3, name: 'CSS', color: '#1572B6' },
                  { icon: tailwindcss, name: 'Tailwind CSS', color: '#17BCB9' },
                  { icon: responsive, name: 'Responsive Design', color: '#717375' },
                  { icon: vite, name: 'Vite', color: '#B13DEB',secondColor:'#FFB40C' }
                ].map((tech)  => (
            
                  <span key={tech.name} 
                    style={{
                      '--tech-color': tech.color,
                      borderColor: tech.color,
                      '--2nd-color': tech.secondColor ?? '#FFFFFF'
                    }}
                    className="relative border-2 bg-white text-gray-800 px-6 py-3 rounded-lg text-sm flex items-center gap-3
                      hover:shadow-lg hover:scale-110 transition-all duration-300 ease-in-out group
                      before:absolute before:inset-0 before:rounded-lg hover:before:bg-[linear-gradient(to_left,var(--tech-color),var(--2nd-color))] hover:before:opacity-80">
                    <img src={tech.icon} alt={tech.name} className="relative z-10 w-7 h-7 object-contain filter drop-shadow-sm" />
                    <span className="relative z-10 font-normal group-hover:text-black">{tech.name}</span>
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <h3 className="w-full text-lg font-subheading font-semibold mb-2">Backend & Database</h3>
                {[
                  { icon: nodeJs, name: 'Node.js', color: '#65A84B', secondColor:'#404137' },
                  { icon: java, name: 'Java', color: '#5382A1', secondColor:'#FF9C00' },
                  { icon: php, name: 'PHP', color: '#6181B6',secondColor:'#000000' },
                  {icon:python, name:'Python', color:'#F7D650', secondColor:'#3D77A8'},
                  { icon: expressJs, name: 'Express.js', color: '#000000' },
                  { icon: mongodb, name: 'MongoDB', color: '#8e714e', secondColor:'#569134' },
                  { icon: jwt, name: 'JWT Authentication', color: '#d63aff', secondColor:'#F50057' },
                  { icon: api, name: 'RESTful APIs', color: '#005bff' },
                  
                ].map((tech) => (
                  <span key={tech.name} 
                    style={{
                      '--tech-color': tech.color,
                      borderColor: tech.color,
                       '--2nd-color': tech.secondColor ?? '#FFFFFF'
                    }}
                    className="relative border-2 bg-white text-gray-800 px-6 py-3 rounded-lg text-sm flex items-center gap-3
                      hover:shadow-lg hover:scale-110 transition-all duration-300 ease-in-out group
                      before:absolute before:inset-0 before:rounded-lg hover:before:bg-[linear-gradient(to_left,var(--tech-color),var(--2nd-color))] hover:before:opacity-90">
                    <img src={tech.icon} alt={tech.name} className="relative z-10 w-8 h-8 object-contain filter drop-shadow-sm" />
                    <span className="relative z-10 font-normal group-hover:text-black">{tech.name}</span>
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <h3 className="w-full text-lg font-subheading font-semibold mb-2">Development Tools</h3>
                {[
                  { icon: git, name: 'Git', color: '#EE513B' },
                  { icon: jest, name: 'Jest Testing', color: '#C63D14' },
                  { icon: eslint, name: 'ESLint', color: '#4B32C3',},
                  { icon: npm, name: 'npm', color: '#CB3837',},
                  {icon:yarn,name:'yarn', color:'#368FB9'},
                  { icon: postcss, name: 'PostCSS', color: '#DD3735' }
                ].map((tech) => (
                  <span key={tech.name} 
                    style={{
                      '--tech-color': tech.color,
                      borderColor: tech.color,
                       '--2nd-color': tech.secondColor ?? '#FFFFFF'
                    }}
                    className="relative border-2 bg-white text-gray-800 px-6 py-3 rounded-lg text-sm flex items-center gap-3
                      hover:shadow-lg hover:scale-110 transition-all duration-300 ease-in-out group
                      before:absolute before:inset-0 before:rounded-lg hover:before:bg-[linear-gradient(to_left,var(--tech-color),var(--2nd-color))] hover:before:opacity-90">
                    <img src={tech.icon} alt={tech.name} className="relative z-10 w-7 h-7 object-contain filter drop-shadow-sm" />
                    <span className="relative z-10 font-normal group-hover:text-black">{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-lg">
                    <img src="/src/assets/MyPic.jpg" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-subheading font-bold text-gray-800">Houssein Taleb</h3>
                    <p className="text-blue-600 font-medium">Full-Stack Developer</p>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold text-blue-600">2+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold text-green-600">15+</div>
                    <div className="text-sm text-gray-600">Technologies</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold text-purple-600">2</div>
                    <div className="text-sm text-gray-600">Internships</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold text-orange-600">100+</div>
                    <div className="text-sm text-gray-600">Projects Completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-gray-50 p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-200/40 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
              
              <h3 className="text-2xl font-subheading font-semibold mb-6 text-gray-800">Education</h3>
            <ul className="space-y-4">
              <li>
                <h4 className="font-semibold">
                  Technical License Diploma (LT) in Computer Science
                </h4>
                <p className="text-gray-600">
                  Higher Orthodox Vocational Institute
                </p>
                <p className="text-gray-500">10/2023 - 07/2024</p>
              </li>
              <li>
                <h4 className="font-semibold">
                  Superior Technician Diploma (TS) in Computer Science
                </h4>
                <p className="text-gray-600">
                  Higher Orthodox Vocational Institute
                </p>
                <p className="text-gray-500">10/2022 - 06/2023</p>
              </li>
              <li>
                <h4 className="font-semibold">
                  High School Certificate Social and Economic Sciences
                </h4>
                <p className="text-gray-600">Secondary Miniara</p>
                <p className="text-gray-500">11/2019 - 06/2020</p>
              </li>
              <li>
                <h4 className="font-semibold">Middle School Certificate</h4>
                <p className="text-gray-600">
                  Dr.Yaacoub Al-Sarraf Public School
                </p>
                <p className="text-gray-500">09/2016 - 06/2017</p>
              </li>
            </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
