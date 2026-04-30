import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { shuffledProjects } from './data';
import { RetroGrid } from './components/ui';
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
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e) => e.preventDefault();
    // Disable common dev tools shortcuts
    const handleKeyDown = (e) => {
      if (e.keyCode === 123) e.preventDefault(); // F12
      if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) e.preventDefault(); // Ctrl+Shift+I/J/C
      if (e.metaKey && e.altKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) e.preventDefault(); // Cmd+Opt+I/J/C
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 85) e.preventDefault(); // Ctrl+U (View Source)
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleUnlock = () => {
    if (password === 'prs2026') {
      setIsLocked(false);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const techs = ["CREATIVE", "DEVELOPMENT", "STRATEGY", "DESIGN", "MOTION"];

  if (isLocked) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="noise-overlay" />
        <RetroGrid />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-[2rem] shadow-2xl"
        >
          <div className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(194,249,112,0.3)]">
            <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-brand-dark"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h2 className="display-title text-4xl mb-4">Protected Area</h2>
          <p className="mono-tag text-[10px] text-brand-gray mb-8">Enter access code to view portfolio</p>
          
          <div className="relative mb-6">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder="••••••••"
              className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl px-6 py-4 text-center text-2xl tracking-[1em] focus:outline-none focus:border-brand-accent transition-colors`}
            />
            {error && <p className="text-red-500 text-[10px] mt-2 mono-tag uppercase">Incorrect access code</p>}
          </div>

          <button 
            onClick={handleUnlock}
            className="w-full bg-brand-accent text-brand-dark py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            Access Portfolio
          </button>
        </motion.div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 mono-tag text-[9px] text-white/20">
          PRS Agency © 2026 • Encryption Enabled
        </div>
      </div>
    );
  }

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
            <a href="mailto:prsforads@gmail.com" className="hover-target">Let's Talk</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[100vh] flex flex-col justify-center items-center text-center px-6 pb-20 pt-32 w-full overflow-hidden">
        <RetroGrid />
        
        <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-widest mb-10 hover-target"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            Available for new projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="display-title text-[12vw] md:text-[9vw] font-normal leading-[0.85] uppercase mb-8"
          >
            Creative <br />
            <span className="italic text-brand-gray">Developer</span><span className="text-brand-accent">.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mono-tag text-xs md:text-sm text-brand-gray max-w-xl mx-auto leading-relaxed mb-16"
          >
            We engineer digital experiences that live at the intersection of design, technology, and storytelling. Operating globally to build scalable, award-winning interfaces.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-8 items-center justify-center w-full"
          >
            <div className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center relative hover-target group cursor-pointer" onClick={() => window.scrollTo(0, window.innerHeight)}>
              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow absolute inset-0">
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                <text className="mono-tag text-[9px] fill-white tracking-widest">
                  <textPath href="#circlePath" startOffset="0%">• SCROLL TO EXPLORE • SCROLL TO EXPLORE</textPath>
                </text>
              </svg>
              <ArrowUpRight className="text-white group-hover:rotate-45 transition-transform" />
            </div>

            <div className="flex gap-12 text-left border-l border-white/10 pl-8 hidden sm:flex">
               <div>
                 <p className="text-white text-3xl display-title">120+</p>
                 <p className="mono-tag text-[9px] text-brand-gray mt-1">Projects Delivered</p>
               </div>
               <div>
                 <p className="text-white text-3xl display-title">99%</p>
                 <p className="mono-tag text-[9px] text-brand-gray mt-1">Client Satisfaction</p>
               </div>
            </div>
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

      {/* Scrolling Marquee Ribbon */}
      <div className="py-4 overflow-hidden bg-[#F5F5F0] flex flex-col justify-center transform -rotate-2 scale-105 my-20 shadow-2xl z-20 relative border-y border-brand-dark/20">
        <div className="flex animate-marquee gap-10 whitespace-nowrap items-center">
          {Array(4).fill(0).map((_, idx) => (
            <div key={idx} className="flex gap-10 items-center">
              {techs.map((tech, i) => (
                <div key={i} className="flex items-center gap-10">
                  <span className="font-anton text-4xl md:text-6xl text-black uppercase tracking-wide">
                    {tech}
                  </span>
                  <span className="w-3 h-3 rounded-full bg-black" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <footer className="py-20 px-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-brand-border pb-12 mb-12">
          <h2 className="display-title text-5xl md:text-8xl">Ready to <br/><span className="italic text-brand-gray">collaborate?</span></h2>
          <a href="mailto:prsforads@gmail.com" className="mono-tag text-sm border-b border-white pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors hover-target">
            prsforads@gmail.com
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mono-tag text-xs text-brand-gray">
          <div className="flex flex-col gap-4">
            <span className="text-white mb-2">Socials</span>
            <a href="https://github.com/parthsharma17prs" target="_blank" rel="noreferrer" className="hover:text-brand-accent hover-target transition-colors">GitHub</a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-brand-accent hover-target transition-colors">LinkedIn</a>
            <a href="https://instagram.com/techiie_prs" target="_blank" rel="noreferrer" className="hover:text-brand-accent hover-target transition-colors">Instagram (techiie_prs)</a>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-white mb-2">Contact</span>
            <a href="mailto:prsforads@gmail.com" className="hover:text-brand-accent hover-target transition-colors">prsforads@gmail.com</a>
            <a href="tel:+918319556016" className="hover:text-brand-accent hover-target transition-colors">+91 83195 56016</a>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-2 lg:items-end">
            <span className="text-white mb-2">Agency</span>
            <a href="http://www.prsagency.gt.tc" target="_blank" rel="noreferrer" className="hover:text-brand-accent hover-target transition-colors">www.prsagency.gt.tc</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
