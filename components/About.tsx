
import React from 'react';
import { motion } from 'framer-motion';

interface AboutProps {
  text: string;
  skills: string[];
  image: string;
}

const About: React.FC<AboutProps> = ({ text, skills, image }) => {
  return (
    <section id="about" className="py-24 md:py-40 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[#C1FF00] font-bold text-lg">/01</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter italic">The Blueprint</h2>
          </div>
          <p className="text-zinc-400 text-xl leading-relaxed mb-12 font-light">
            {text}
          </p>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="px-5 py-2 bg-transparent border border-zinc-800 text-[#C1FF00] text-[10px] font-black tracking-widest uppercase hover:bg-[#C1FF00] hover:text-black transition-all cursor-crosshair">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-[#C1FF00]/5 -m-6 z-0"></div>
          <div className="relative z-10 aspect-video bg-zinc-900 overflow-hidden border border-zinc-800">
             <img 
               src={image} 
               alt="Process Visual" 
               className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
             />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C1FF00]">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
