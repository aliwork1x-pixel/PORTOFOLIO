
import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.2 } },
  viewport: { once: true, margin: "-100px" }
};

const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <section id="services" className="py-24 md:py-40 border-t border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          {...fadeInUp}
          className="flex items-center gap-4 mb-20"
        >
          <span className="text-[#C1FF00] font-bold text-lg">/03</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold">Capabilities</h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              className={`p-12 border-zinc-800 transition-all duration-500 group relative
                ${index === 0 ? 'md:border-r' : ''}
                ${index === 1 ? 'md:border-r' : ''}
                border-b md:border-b-0
              `}
            >
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#C1FF00] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-5xl mb-12 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-3xl font-display font-bold mb-6 group-hover:text-[#C1FF00] transition-colors">{service.title}</h3>
              <p className="text-zinc-500 leading-relaxed font-light text-lg">
                {service.description}
              </p>
              <div className="mt-10 h-[1px] w-0 bg-[#C1FF00] group-hover:w-full transition-all duration-700"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
