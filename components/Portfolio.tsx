
import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface PortfolioProps {
  projects: Project[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  // Automatic Sorting: Newest First
  const sortedProjects = [...projects].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section id="portfolio" className="py-24 md:py-40 bg-[#000]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
               <span className="text-[#C1FF00] font-bold text-lg">/02</span>
               <p className="text-[#C1FF00] uppercase tracking-[0.4em] text-xs font-bold">Selected Operations</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">Case Studies</h2>
          </div>
          <div className="text-right">
             <p className="text-zinc-500 font-display italic text-lg max-w-xs">
               Explorations in visual geometry and kinetic systems.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {sortedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-10 bg-zinc-900 border border-zinc-800 group-hover:border-[#C1FF00]/40 transition-colors duration-500">
                {project.imageUrl && (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-[#C1FF00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-10 left-10 overflow-hidden">
                   <p className="text-white font-display text-4xl font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                     {project.title}
                   </p>
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-900 pb-6 group-hover:border-[#C1FF00]/40 transition-colors">
                <p className="text-[#C1FF00] uppercase tracking-[0.3em] text-[10px] font-bold">{project.category}</p>
                <div className="text-right">
                  <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">{new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
