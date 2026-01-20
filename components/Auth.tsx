
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';

interface AuthProps {
  mode: 'login' | 'signup';
  onSuccess: (user: User) => void;
  onSwitch: () => void;
  onCancel: () => void;
}

const Auth: React.FC<AuthProps> = ({ mode, onSuccess, onSwitch, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    governorate: '',
    whatsapp: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Normalize email for consistency
    const normalizedEmail = formData.email.trim().toLowerCase();

    // Simulate small delay for "Security Scan" feel
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('aura_registered_users') || '[]');
      
      if (mode === 'signup') {
        if (users.find((u: User) => u.email === normalizedEmail)) {
          setError('IDENT_EXISTS: This email is already registered in our core database.');
          setIsSubmitting(false);
          return;
        }
        
        const newUser: User = { 
          ...formData,
          email: normalizedEmail,
          id: Date.now().toString(), 
          role: normalizedEmail === 'aly575490@gmail.com' ? 'admin' : 'user' 
        };
        
        users.push(newUser);
        localStorage.setItem('aura_registered_users', JSON.stringify(users));
        onSuccess(newUser);
      } else {
        const user = users.find((u: User) => u.email === normalizedEmail && u.password === formData.password);
        if (user) {
          onSuccess(user);
        } else {
          // Check if email exists at all to provide better hint
          const emailExists = users.some((u: User) => u.email === normalizedEmail);
          if (!emailExists) {
            setError('ACCESS_DENIED: Email not found. Please "Request Access" (Sign Up) first.');
          } else {
            setError('AUTH_FAILURE: Incorrect security pin for this identity.');
          }
          setIsSubmitting(false);
        }
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black grid-bg relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className="w-full max-w-md bg-zinc-950 border border-zinc-800 p-10 relative z-10"
      >
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#C1FF00]"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border border-[#C1FF00]"></div>

        <h2 className="text-4xl font-display font-black tracking-tighter mb-2 uppercase italic">
          {mode === 'login' ? 'SECURE_LOGIN' : 'CREATE_NODE'}
        </h2>
        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-8 font-bold">
          {mode === 'login' ? 'ESTABLISHING HANDSHAKE...' : 'REGISTERING NEW OPERATOR...'}
        </p>

        {error && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-red-950/20 border border-red-500/50 p-3 mb-6"
          >
            <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-zinc-600 font-bold tracking-widest">Full Name</label>
                <input required className="w-full bg-zinc-900 border border-zinc-800 p-3 outline-none focus:border-[#C1FF00] text-sm text-white placeholder:text-zinc-700" 
                  placeholder="OPERATOR NAME"
                  value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-600 font-bold tracking-widest">Phone</label>
                  <input required className="w-full bg-zinc-900 border border-zinc-800 p-3 outline-none focus:border-[#C1FF00] text-sm text-white placeholder:text-zinc-700" 
                    placeholder="+20"
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-600 font-bold tracking-widest">Governorate</label>
                  <input required className="w-full bg-zinc-900 border border-zinc-800 p-3 outline-none focus:border-[#C1FF00] text-sm text-white placeholder:text-zinc-700" 
                    placeholder="LOCALE"
                    value={formData.governorate} onChange={e => setFormData({...formData, governorate: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-zinc-600 font-bold tracking-widest">WhatsApp Number</label>
                <input required className="w-full bg-zinc-900 border border-zinc-800 p-3 outline-none focus:border-[#C1FF00] text-sm text-white placeholder:text-zinc-700" 
                  placeholder="WP_SECURE"
                  value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
              </div>
            </motion.div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] uppercase text-zinc-600 font-bold tracking-widest">Access Email</label>
            <input required type="email" className="w-full bg-zinc-900 border border-zinc-800 p-3 outline-none focus:border-[#C1FF00] text-sm text-white placeholder:text-zinc-700" 
              placeholder="operator@aura.labs"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase text-zinc-600 font-bold tracking-widest">Security Pin</label>
            <input required type="password" placeholder="••••••••" className="w-full bg-zinc-900 border border-zinc-800 p-3 outline-none focus:border-[#C1FF00] text-sm text-white" 
              value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>

          <button 
            disabled={isSubmitting}
            className={`w-full bg-[#C1FF00] text-black py-4 font-black uppercase text-xs tracking-[0.3em] transition-all mt-4 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-50 cursor-wait' : 'hover:neon-shadow-strong'}`}
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </>
            ) : (
              mode === 'login' ? 'INITIALIZE_AUTH' : 'AUTHORIZE_NODE'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-900 flex justify-between items-center">
          <button onClick={onSwitch} className="text-[10px] uppercase text-zinc-500 hover:text-[#C1FF00] font-bold transition-colors">
            {mode === 'login' ? 'Request Access' : 'Return to Login'}
          </button>
          <button onClick={onCancel} className="text-[10px] uppercase text-zinc-500 hover:text-white font-bold transition-colors">
            Exit System
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
