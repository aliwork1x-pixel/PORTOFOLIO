
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import { ADMIN_EMAIL } from '../constants';

interface NavbarProps {
  currentUser: User | null;
  onLogout: () => void;
  onAuthView: (view: 'login' | 'signup') => void;
  onAdminToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, onLogout, onAuthView, onAdminToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const isAdmin = currentUser?.email === ADMIN_EMAIL;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-[#C1FF00]/20 py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="text-2xl font-display font-bold tracking-tighter flex items-center gap-2 group">
          <span className="w-5 h-5 bg-[#C1FF00] block group-hover:rotate-90 transition-transform"></span>
          AURA <span className="text-[#C1FF00]">LABS</span>
        </a>

        <div className="hidden md:flex gap-10 items-center">
          {['Portfolio', 'Services', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/50 hover:text-[#C1FF00] transition-colors"
            >
              {item}
            </a>
          ))}
          
          <div className="h-4 w-[1px] bg-zinc-800"></div>

          {currentUser ? (
            <div className="flex items-center gap-6">
              {isAdmin && (
                <button
                  onClick={onAdminToggle}
                  className="text-[10px] uppercase tracking-widest font-bold text-[#C1FF00] border-b border-[#C1FF00]"
                >
                  Root
                </button>
              )}
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Hi, {currentUser.fullName.split(' ')[0]}</span>
              <button 
                onClick={onLogout}
                className="text-[10px] uppercase tracking-widest font-bold text-white hover:text-red-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <button 
                onClick={() => onAuthView('login')}
                className="text-[10px] uppercase tracking-widest font-bold text-white hover:text-[#C1FF00]"
              >
                Sign In
              </button>
              <button 
                onClick={() => onAuthView('signup')}
                className="bg-[#C1FF00] text-black px-5 py-2 text-[10px] uppercase tracking-widest font-black hover:neon-shadow transition-all"
              >
                Join
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
