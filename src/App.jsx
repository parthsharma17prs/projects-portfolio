import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ExternalLink, Code2, Globe, Rocket, ArrowRight, LayoutGrid } from 'lucide-react';
import { shuffledProjects } from './data';
import './index.css';

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, delay: index % 3 * 0.15 }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      whileHover={{ y: -5 }}
      className="fintech-card rounded-[2rem] p-8 flex flex-col h-full relative overflow-hidden group transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent opacity-0 group-hover:opacity-5 transition-opacity blur-3xl rounded-full" />
      
      <div className="flex justify-between items-start mb-8">
        <div className="w-12 h-12 rounded-full bg-brand-dark border border-brand-border flex items-center justify-center text-brand-accent">
          <LayoutGrid size={20} />
        </div>
        <div className="flex items-center gap-2">
          {project.deployed ? (
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-brand-accent text-brand-dark">
              <Globe size={12} /> Live
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-brand-border text-brand-gray">
              <Rocket size={12} /> Local
            </span>
          )}
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-accent transition-colors">
        {project.title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.techStack.map((tech, i) => (
          <span 
            key={i} 
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-brand-border text-brand-gray"
          >
            <Code2 size={12} />
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto">
        {project.link ? (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full p-4 rounded-2xl bg-brand-dark hover:bg-brand-accent text-white hover:text-brand-dark font-bold transition-all duration-300 group/btn"
          >
            <span>View Project</span>
            <div className="w-8 h-8 rounded-full bg-brand-surface group-hover/btn:bg-brand-dark flex items-center justify-center transition-colors">
              <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        ) : (
          <div className="flex items-center justify-center w-full p-4 rounded-2xl bg-brand-dark text-brand-gray font-bold opacity-50 cursor-not-allowed">
            No Link Available
          </div>
        )}
      </div>
    </motion.div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-brand-dark relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-brand-accent/5 blur-[120px] rounded-[100%] pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-pill px-6 py-4 rounded-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center">
              <div className="w-3 h-3 bg-brand-dark rounded-sm" />
            </div>
            <span className="font-bold text-lg tracking-tight">Portfolio.</span>
          </div>
          <a 
            href="#" 
            className="hidden sm:flex items-center gap-2 text-sm font-bold bg-white text-brand-dark px-5 py-2.5 rounded-full hover:bg-brand-accent transition-colors"
          >
            Contact Me <ArrowRight size={16} />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-48 pb-20 px-6 max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent text-xs font-bold uppercase tracking-wider mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            Latest Works 2026
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
            Creative Landing Page <br />
            <span className="text-brand-gray">Web Design for</span> <br />
            <span className="text-brand-accent">Easily Fintech</span> Web App
          </h1>
          
          <p className="text-brand-gray text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            A curated collection of my recent projects, fully redesigned using the sleek, modern aesthetic of the "Easily" fintech platform. Built with React, Tailwind CSS v4, and Framer Motion.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto h-14 px-8 rounded-full bg-brand-accent hover:bg-white text-brand-dark font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/20 group">
              Explore Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto h-14 px-8 rounded-full bg-brand-surface border border-brand-border hover:border-brand-accent/50 text-white font-bold transition-colors flex items-center justify-center gap-2">
              View Github
            </button>
          </div>
        </motion.div>
      </header>

      {/* Projects Grid */}
      <main className="px-6 pb-32 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shuffledProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-border py-12 text-center text-brand-gray text-sm font-medium">
        <p>Built with ❤️ using React & Tailwind v4. Inspired by Easily Fintech.</p>
      </footer>
    </div>
  );
}

export default App;
