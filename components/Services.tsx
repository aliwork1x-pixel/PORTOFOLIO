
import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
}

const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <section id="services" className="py-24 md:py-40 border-t border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-20">
          <span className="text-[#C1FF00] font-bold text-lg">/03</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold">Capabilities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
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
        </div>
      </div>
    </section>
  );
};

export default Services;
