import './App.css'
import './styles/accessibility.css'
import { useState, useCallback } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Hero from "./components/Hero";
import About from "./components/About";
import WorkExperience from "./components/WorkExperience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  
  // Memoize the setActiveSection function to prevent unnecessary re-renders
  const handleSetActiveSection = useCallback((section) => {
    setActiveSection(section);
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Navbar
          activeSection={activeSection}
          setActiveSection={handleSetActiveSection}
        />
        <main role="main">
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>
          <ErrorBoundary>
            <About />
          </ErrorBoundary>
          <ErrorBoundary>
            <WorkExperience />
          </ErrorBoundary>
          <ErrorBoundary>
            <Skills />
          </ErrorBoundary>
          <ErrorBoundary>
            <Projects />
          </ErrorBoundary>
          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
