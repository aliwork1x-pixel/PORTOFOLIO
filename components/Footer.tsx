
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 text-[10px] uppercase tracking-[0.2em]">
        <p>&copy; {new Date().getFullYear()} Aura Design Studio. All Rights Reserved.</p>
        <p>Built with Elegance & Precision</p>
        <div className="flex gap-8">
            <a href="#" className="hover:text-[#D4AF37]">Privacy Policy</a>
            <a href="#" className="hover:text-[#D4AF37]">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
