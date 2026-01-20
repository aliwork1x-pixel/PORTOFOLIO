
import React from 'react';
import { motion } from 'framer-motion';

interface ContactProps {
  email: string;
}

const Contact: React.FC<ContactProps> = ({ email }) => {
  return (
    <section id="contact" className="py-24 md:py-40 bg-black overflow-hidden relative">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C1FF00]/5 rounded-full blur-[120px] -z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
             <div className="flex items-center gap-4 mb-10">
               <span className="text-[#C1FF00] font-bold text-lg">/04</span>
               <h2 className="text-5xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter">
                INITIATE <br/><span className="text-[#C1FF00]">PROJECT</span>
               </h2>
            </div>
            <div className="space-y-12">
              <div>
                <p className="text-zinc-500 uppercase tracking-[0.5em] text-[10px] font-bold mb-4">Secure Line</p>
                <a href={`mailto:${email}`} className="text-2xl md:text-4xl font-display hover:text-[#C1FF00] transition-colors decoration-[#C1FF00] underline decoration-1 underline-offset-8">{email}</a>
              </div>
              <div className="flex flex-wrap gap-8">
                {['INSTAGRAM', 'TWITTER', 'LINKEDIN', 'BEHANCE'].map((social) => (
                  <a key={social} href="#" className="text-zinc-400 hover:text-[#C1FF00] text-[10px] font-bold uppercase tracking-[0.3em] transition-all">[{social}]</a>
                ))}
              </div>
            </div>
          </div>

          <motion.form 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 bg-zinc-900/40 p-12 backdrop-blur-sm border border-zinc-800/50"
          >
            <div className="space-y-10">
              <div className="relative">
                <input type="text" placeholder="YOUR NAME" className="w-full bg-transparent border-b border-zinc-800 py-4 focus:border-[#C1FF00] outline-none transition-colors font-display font-bold text-lg placeholder:text-zinc-700" />
              </div>
              <div className="relative">
                <input type="email" placeholder="YOUR EMAIL" className="w-full bg-transparent border-b border-zinc-800 py-4 focus:border-[#C1FF00] outline-none transition-colors font-display font-bold text-lg placeholder:text-zinc-700" />
              </div>
              <div className="relative">
                <textarea rows={3} placeholder="TELL ME ABOUT THE MISSION" className="w-full bg-transparent border-b border-zinc-800 py-4 focus:border-[#C1FF00] outline-none transition-colors font-display font-bold text-lg resize-none placeholder:text-zinc-700" />
              </div>
            </div>
            <button className="w-full bg-[#C1FF00] text-black py-6 font-bold tracking-[0.4em] uppercase text-xs hover:neon-shadow-strong transition-all active:scale-95">
              Send Transmission
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
