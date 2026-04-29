import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, ArrowUpRight } from 'lucide-react';
import { shuffledProjects } from './data';
import { DotPattern, ShinyButton, Marquee, AnimatedText } from './components/ui';
import './index.css';

const ProjectRow = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="project-row group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 transition-colors duration-500 hover:bg-white/[0.02] px-6 rounded-2xl cursor-pointer"
      onClick={() => project.link && window.open(project.link, '_blank')}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 flex-1">
        <h3 className="text-3xl md:text-5xl font-bold text-white/80 group-hover:text-brand-accent transition-colors duration-500">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, i) => (
            <span 
              key={i} 
              className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-bold uppercase tracking-wider text-brand-gray group-hover:border-brand-accent/30 group-hover:text-white transition-colors duration-500"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 md:mt-0 flex items-center gap-6">
        <span className={`text-sm font-bold uppercase tracking-widest ${project.deployed ? 'text-brand-accent' : 'text-brand-gray'}`}>
          {project.deployed ? 'Live' : 'Local'}
        </span>
        
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-500 overflow-hidden relative">
          <ArrowUpRight 
            size={24} 
            className="text-white group-hover:text-brand-dark transition-all duration-500 absolute row-arrow" 
          />
        </div>
      </div>

      {/* Floating Hover Image/Gradient Effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] rounded-3xl bg-brand-surface border border-white/10 shadow-2xl overflow-hidden pointer-events-none z-10"
          >
            <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at center, ${project.color || 'var(--color-brand-accent)'} 0%, transparent 70%)` }} />
            <div className="absolute inset-0 flex items-center justify-center text-white/50 font-bold text-2xl tracking-widest uppercase">
              Preview
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function App() {
  const techs = ["React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "Node.js", "GSAP", "Vite", "Supabase"];

  return (
    <div className="min-h-screen bg-brand-dark relative font-sans text-white">
      {/* 21st.dev Style Dot Pattern Background */}
      <DotPattern
        className="[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
        width={20}
        height={20}
        cr={1.5}
      />

      {/* Floating Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-8 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center">
              <div className="w-3 h-3 bg-brand-dark rounded-sm" />
            </div>
            <span className="font-bold tracking-tight">Port.</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-brand-gray">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </div>
          <ShinyButton text="Let's Talk" className="h-10 text-xs px-6" />
        </div>
      </nav>

      {/* Advanced Hero Section */}
      <header className="relative pt-48 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10 min-h-[80vh] justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
          </span>
          Next Gen Portfolio
        </motion.div>
        
        <div className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
          <AnimatedText text="CREATIVE" className="justify-center text-white" />
          <AnimatedText text="DEVELOPER" className="justify-center text-brand-gray" />
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-brand-gray text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-16 font-medium"
        >
          Building highly interactive, premium web experiences with cutting-edge frontend technologies.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <ShinyButton 
            text={<>View Projects <ArrowRight size={18} /></>}
            className="h-16 px-10 text-lg bg-white text-brand-dark hover:bg-brand-accent transition-colors"
          />
        </motion.div>
      </header>

      {/* Marquee Section */}
      <div className="relative py-10 border-y border-white/10 bg-brand-dark z-10 overflow-hidden flex flex-col items-center">
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-brand-dark to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-brand-dark to-transparent z-20 pointer-events-none" />
        <Marquee className="max-w-full" pauseOnHover={false} repeat={8}>
          {techs.map((tech, i) => (
            <span key={i} className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white/5 mx-8">
              {tech}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Advanced Interactive Project Rows */}
      <main id="work" className="px-6 py-32 max-w-7xl mx-auto relative z-10">
        <div className="mb-20 flex justify-between items-end">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Selected <br/><span className="text-brand-accent">Works.</span></h2>
          <p className="text-brand-gray font-bold uppercase tracking-widest hidden md:block">(2024 - 2026)</p>
        </div>

        <div className="border-t border-white/10">
          {shuffledProjects.map((project, index) => (
            <ProjectRow key={index} project={project} index={index} />
          ))}
        </div>
      </main>

      <footer className="border-t border-white/10 py-16 text-center z-10 relative bg-brand-dark">
        <DotPattern className="[mask-image:linear-gradient(transparent,white)] opacity-50" width={30} height={30} cr={1} />
        <h2 className="text-4xl font-bold mb-8 relative z-10">Let's build something <span className="text-brand-accent">magical.</span></h2>
        <ShinyButton text="Get in Touch" className="mx-auto relative z-10" />
      </footer>
    </div>
  );
}

export default App;
