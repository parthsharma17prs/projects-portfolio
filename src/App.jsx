import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ExternalLink, Code2, Rocket, Globe } from 'lucide-react';
import { shuffledProjects } from './data';
import './index.css';

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        delay: index % 3 * 0.2,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="glass-panel rounded-2xl p-6 relative overflow-hidden group border border-white/5 hover:border-white/20 transition-all"
    >
      {/* Background glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(circle at center, ${project.color} 0%, transparent 70%)` }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-serif font-bold text-warm-white tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
            {project.title}
          </h3>
          <div className="flex items-center gap-2">
            {project.deployed ? (
              <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                <Globe size={12} /> Live
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Rocket size={12} /> Local
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto pt-6 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <span 
                key={i} 
                className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5"
              >
                <Code2 size={12} className="text-gray-400" />
                {tech}
              </span>
            ))}
          </div>

          {project.link ? (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 group/btn"
            >
              View Project
              <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </a>
          ) : (
            <button 
              disabled
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 text-gray-500 font-medium cursor-not-allowed"
            >
              No Link Available
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] selection:bg-white/20 selection:text-white">
      {/* Aesthetic Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-aesthetic-blue/20 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-aesthetic-red/10 blur-[150px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] rounded-full bg-aesthetic-green/10 blur-[120px]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 md:mb-32"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-aesthetic-green animate-pulse" />
            <span className="text-sm font-medium tracking-wider text-gray-300 uppercase">Portfolio Gallery</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 tracking-tight">
            MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-aesthetic-blue via-aesthetic-green to-aesthetic-red animate-gradient-x">PROJECTS</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-sans font-light leading-relaxed">
            A curated collection of my recent works, showcasing a variety of frontend interfaces, creative coding experiments, and full-stack web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {shuffledProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
