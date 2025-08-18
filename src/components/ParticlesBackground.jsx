import { useCallback, memo, useState, useEffect } from "react";
import { loadSlim } from "tsparticles-slim"; // Using slim version for better performance
import Particles from "react-tsparticles";

const ParticlesBackground = () => {
  const [colorTheme, setColorTheme] = useState(["#8e66e3", "#518eb3", "#24ac91"]);
  
  // Switch color theme based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      // Morning theme
      setColorTheme(["#ff9a3c", "#f25c54", "#ffbd00"]);
    } else if (hour >= 12 && hour < 18) {
      // Afternoon theme
      setColorTheme(["#8e66e3", "#518eb3", "#24ac91"]);
    } else {
      // Evening/night theme
      setColorTheme(["#3a506b", "#1c2541", "#5bc0be"]);
    }
  }, []);

  const particlesInit = useCallback(async (engine) => {
    // Using loadSlim instead of loadFull for better performance
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false,
        },
        fpsLimit: 60, // Balanced for performance and smoothness
        particles: {
          number: {
            value: 50, // Further reduced for better performance
            density: {
              enable: true,
              value_area: 800, // Better distribution
            },
          },
          color: {
            value: colorTheme, // Using dynamic color theme
          },
          shape: {
            type: ["circle", "star"], // Added variety with multiple shapes
            options: {
              sides: 5
            }
          },
          opacity: {
            value: 0.8,
            random: {
              enable: true,
              minimumValue: 0.2,
            },
            animation: {
              enable: true,
              speed: 0.2,
              minimumValue: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: {
              enable: true,
              minimumValue: 1,
            },
            animation: {
              enable: true,
              speed: 0.2,
              minimumValue: 0.1,
              sync: false,
            },
          },
          links: {
            enable: true,
            distance: 150, // Increased for more visible connections
            color: "#ffffff", // White links for better visibility
            opacity: 0.2, // Reduced for subtlety

            width: 1,
            triangles: {
              enable: true,
              opacity: 0.05,
            },
          },
          move: {
            enable: true,
            speed: 2, // Reduced for smoother movement
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "bounce", // Changed to bounce for more interesting movement
            },
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: ["grab", "bubble"], // Added bubble for more interactive effects
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 180, // Increased grab distance
              links: {
                opacity: 0.8, // More visible connections on hover
                color: "#ffffff", // White links
              },
            },
            bubble: {
              distance: 200,
              size: 12, // Smaller bubbles
              duration: 2, // Shorter duration for better performance
              opacity: 0.6,
              speed: 3,
            },
            push: {
              quantity: 3, // Balanced quantity
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        background: {
          color: "transparent",
        },
        detectRetina: true,
        responsive: [
          {
            maxWidth: 768, // Mobile breakpoint
            options: {
              particles: {
                number: {
                  value: 10, // Even fewer particles on mobile
                },
                move: {
                  speed: 1.5, // Slower movement on mobile
                },
              },
            },
          },
        ],
      }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ParticlesBackground);
