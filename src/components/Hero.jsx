import { motion, LazyMotion, domAnimation } from "framer-motion";
import { lazy, Suspense } from "react";

// Lazy load the ParticlesBackground component
const ParticlesBackground = lazy(() => import("./ParticlesBackground"));

const Hero = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-r from-primary/5 to-secondary/5"></div>}>
            <ParticlesBackground />
          </Suspense>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              Hi, I'm <span className="gradient-bg">Houssein Taleb</span>
            </h1>
            <p className="text-xl md:text-2xl font-body text-gray-600 mb-8">
              Full-Stack Developer | React & Node.js | Secure Login Systems & Full E-commerce Features
            </p>

            <motion.button
              className="border-2 bg-[#2699EC] bg px-8 py-3 rounded-full text-lg  hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="#projects">View My Work</a>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default Hero;
