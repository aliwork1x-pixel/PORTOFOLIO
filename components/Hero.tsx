
import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  tagline: string;
  image: string;
  ctaText: string;
}

const Hero: React.FC<HeroProps> = ({ title, tagline, image, ctaText }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-black grid-bg">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="relative"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1 bg-[#C1FF00] w-12 mb-10 origin-left"
          />
          <h2 className="text-[#C1FF00] font-display font-black uppercase tracking-[0.5em] text-xs mb-4 italic">Visionary Creative</h2>
          <h1 className="text-7xl md:text-[8rem] font-display font-black leading-[0.85] mb-10 tracking-tighter uppercase italic">
            {title.split(' ').map((word, i) => (
              <span key={i} className="block relative group">
                <span className="relative z-10">{word}</span>
                {i === 1 && <span className="absolute left-0 bottom-0 w-full h-4 bg-[#C1FF00]/10 -z-0"></span>}
              </span>
            ))}
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-sm leading-relaxed font-medium mb-12 border-l-2 border-[#C1FF00] pl-8">
            {tagline}
          </p>
          <div className="flex flex-wrap gap-8">
            <a href="#portfolio" className="group relative bg-[#C1FF00] text-black px-10 py-5 font-black tracking-[0.3em] uppercase text-[10px] hover:neon-shadow-strong transition-all">
              {ctaText}
              <span className="absolute -top-1 -left-1 w-2 h-2 bg-white"></span>
              <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-white"></span>
            </a>
            <a href="#contact" className="border border-white/20 text-white px-10 py-5 font-black tracking-[0.3em] uppercase text-[10px] hover:border-[#C1FF00] hover:text-[#C1FF00] transition-all">
              Initiate Project
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "circOut", delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-[#C1FF00]"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-[#C1FF00]"></div>
          
          <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-zinc-800">
            <img 
              src={image} 
              alt="Artboard" 
              className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 transform scale-110 hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-10 left-10 w-4 h-4 rounded-full bg-[#C1FF00] blur-md"
            />
          </div>

          <div className="absolute -bottom-10 -left-10 bg-black border border-zinc-800 p-8 shadow-2xl">
             <p className="text-[#C1FF00] text-3xl font-black italic tracking-tighter">OS_RUN</p>
             <p className="text-zinc-600 text-[8px] uppercase font-bold tracking-[0.3em] mt-2 leading-none">Creative Operator</p>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 text-zinc-800">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] rotate-90 origin-right translate-y-12">SYSTEM_SCAN</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-[#C1FF00] to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
