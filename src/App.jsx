import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { shuffledProjects } from './data';
import './index.css';

// --- Custom Cursor Component ---
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.hover-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className={`custom-cursor ${isHovering ? 'hovering' : ''} flex items-center justify-center`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    >
      <AnimatePresence>
        {isHovering && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-[10px] font-mono font-bold text-white uppercase mix-blend-normal"
          >
            Explore
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Project Row Component ---
const ProjectRow = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef(null);
  
  // Calculate a random rotation and a placeholder image color for the preview
  const rotate = (index % 2 === 0 ? 1 : -1) * (2 + Math.random() * 4);
  const hue = (index * 45) % 360;

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="row-border group relative flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-16 hover-target cursor-none transition-colors duration-500 hover:bg-white/[0.02] px-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => project.link && window.open(project.link, '_blank')}
    >
      {/* Title & Index */}
      <div className="flex items-start md:items-center gap-6 md:gap-16 w-full md:w-1/2">
        <span className="mono-tag text-xs text-brand-gray w-8 mt-2 md:mt-0">
          {(index + 1).toString().padStart(2, '0')}
        </span>
        <h3 className="display-title text-5xl md:text-7xl font-normal group-hover:italic group-hover:text-brand-accent transition-all duration-500">
          {project.title}
        </h3>
      </div>

      {/* Tech Stack & Status */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 mt-6 md:mt-0 w-full md:w-1/2 justify-end">
        <div className="flex flex-wrap gap-3 max-w-[300px]">
          {project.techStack.map((tech, i) => (
            <span key={i} className="mono-tag text-[10px] text-brand-gray/80 px-3 py-1 border border-white/10 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-6">
          <span className={`mono-tag text-xs ${project.deployed ? 'text-white' : 'text-brand-gray'}`}>
            {project.deployed ? 'Live' : 'Local'}
          </span>
          <ArrowUpRight size={32} strokeWidth={1} className="text-white opacity-50 group-hover:opacity-100 group-hover:rotate-45 group-hover:text-brand-accent transition-all duration-500" />
        </div>
      </div>

      {/* Hover Image Reveal */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: rotate - 10, y: "10%" }}
            animate={{ opacity: 1, scale: 1, rotate: rotate, y: "-50%" }}
            exit={{ opacity: 0, scale: 0.8, rotate: rotate + 10, y: "10%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex absolute top-1/2 left-[40%] w-[400px] h-[250px] bg-brand-surface border border-white/5 shadow-2xl pointer-events-none z-20 items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(45deg, hsl(${hue}, 80%, 50%), transparent)` }} />
            <h4 className="display-title text-4xl italic text-white/50 relative z-10">{project.title}</h4>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function App() {
  const techs = ["CREATIVE", "DEVELOPMENT", "STRATEGY", "DESIGN", "MOTION"];

  return (
    <div className="min-h-screen bg-brand-dark text-white relative">
      <div className="noise-overlay" />
      <CustomCursor />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
        <div className="flex justify-between items-center text-white">
          <div className="mono-tag text-xs font-bold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            STUDIO ©2026
          </div>
          <div className="mono-tag text-xs">
            <a href="mailto:hello@example.com" className="hover-target">Let's Talk</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex flex-col justify-end px-6 pb-20 max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-6 md:flex-row justify-between items-end mb-12 border-b border-brand-border pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md"
          >
            <p className="mono-tag text-xs text-brand-gray mb-6 leading-relaxed">
              We engineer digital experiences that live at the intersection of design, technology, and storytelling. Operating globally.
            </p>
            <div className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center relative hover-target group">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow absolute inset-0">
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                <text className="mono-tag text-[9px] fill-white tracking-widest">
                  <textPath href="#circlePath" startOffset="0%">• SCROLL TO EXPLORE • SCROLL TO EXPLORE</textPath>
                </text>
              </svg>
              <ArrowUpRight className="text-white group-hover:rotate-45 transition-transform" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-right"
          >
            <h1 className="display-title text-[15vw] md:text-[10vw] font-normal leading-[0.8] uppercase">
              Selected <br />
              <span className="italic text-brand-gray pr-4">Works</span><span className="text-brand-accent">.</span>
            </h1>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto pb-32">
        <div className="border-t border-brand-border mt-10">
          {shuffledProjects.map((project, index) => (
            <ProjectRow key={index} project={project} index={index} />
          ))}
        </div>
      </main>

      {/* Scrolling Marquee */}
      <div className="border-y border-brand-border py-6 overflow-hidden bg-brand-dark flex flex-col justify-center">
        <div className="flex animate-marquee gap-10 whitespace-nowrap">
          {Array(4).fill(0).map((_, idx) => (
            <div key={idx} className="flex gap-10 items-center">
              {techs.map((tech, i) => (
                <div key={i} className="flex items-center gap-10">
                  <span className="display-title text-6xl md:text-8xl text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] uppercase">
                    {tech}
                  </span>
                  <span className="w-4 h-4 rounded-full bg-brand-accent" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <footer className="py-20 px-6 max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <h2 className="display-title text-5xl md:text-8xl">Ready to <br/><span className="italic text-brand-gray">collaborate?</span></h2>
        <a href="mailto:hello@example.com" className="mono-tag text-sm border-b border-white pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors hover-target">
          Start a project
        </a>
      </footer>
    </div>
  );
}

export default App;
