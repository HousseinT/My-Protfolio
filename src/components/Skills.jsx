import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import javascript from "../assets/tech-icons/javascript.svg";
import html5 from "../assets/tech-icons/html5.svg";
import css3 from "../assets/tech-icons/css3.svg";
import git from "../assets/tech-icons/git.svg";
import react from "../assets/tech-icons/React.svg";
import tailwindcss from "../assets/tech-icons/tailwindcss.svg";
import nodeJs from "../assets/tech-icons/nodeJs.svg";
import mongodb from "../assets/tech-icons/mongodb.svg";
import python from "../assets/tech-icons/python.svg";
import php from "../assets/tech-icons/php.svg";
import java from "../assets/tech-icons/java.svg";

const skillsData = [
  { 
    name: "HTML/CSS", 
    level: 100, 
    icon: css3,
  },
  { 
    name: "JavaScript ES6+", 
    level: 95, 
    icon: javascript,
  },
  { 
    name: "Git & GitHub", 
    level: 95, 
    icon: git,
  },
  { 
    name: "React.js", 
    level: 100,
    icon: react,
  },
  { 
    name: "Tailwind CSS", 
    level: 95, 
    icon: tailwindcss,
  },
  { 
    name: "Node.js", 
    level: 90, 
    icon: nodeJs,
  },
  { 
    name: "MongoDB", 
    level: 90, 
    icon: mongodb,
  },
  { 
    name: "Python", 
    level: 80, 
    icon: python,
  },
  { 
    name: "PHP", 
    level: 85, 
    icon: php,
  },
  { 
    name: "Java", 
    level: 75, 
    icon: java,
  },
];

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Function to get skill level text based on percentage
  const getSkillLevelText = (level) => {
    if (level >= 90) return "Expert";
    if (level >= 70) return "Proficient";
    if (level >= 50) return "Intermediate";
    if (level >= 30) return "Basic";
    return "Beginner";
  };

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-heading font-bold mb-4">Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="p-6 rounded-lg shadow-md bg-white relative overflow-hidden  hover:${skill.icon} opacity-100"
            >
              {skill.icon && (
                <img 
                  src={skill.icon}
                  alt={`${skill.name} icon`}
                  className="absolute top-2 right-2 w-16 h-16 opacity-30 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none object-contain"
                />
              )}
              <div className="flex justify-between mb-2 ">
                <span className="font-body font-medium ">{skill.name}</span>
                <span className="font-body font-medium text-primary">{getSkillLevelText(skill.level)} ({skill.level}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                <motion.div
                  className="bg-blue-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.1 }}
                ></motion.div>
              </div>
              <p className="text-sm font-body text-gray-600">{skill.behavior}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
