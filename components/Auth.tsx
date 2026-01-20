
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import { ADMIN_EMAIL } from '../constants';

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
          role: normalizedEmail === ADMIN_EMAIL ? 'admin' : 'user' 
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
            if (normalizedEmail === ADMIN_EMAIL) {
              setError(`ACCESS_DENIED: The Admin account [${ADMIN_EMAIL}] has not been created on this device yet. Please click "Request Identity" below to initialize your profile.`);
            } else {
              setError('IDENT_NOT_FOUND: User does not exist in the database.');
            }
          } else {
            setError('CREDENTIAL_MISMATCH: Invalid password for this identity.');
          }
          setIsSubmitting(false);
        }
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md bg-zinc-950 border border-zinc-900 p-8 md:p-12 shadow-2xl"
      >
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-3xl font-display font-black text-white italic uppercase tracking-tighter">
              {mode === 'login' ? 'Auth_Login' : 'Core_Register'}
            </h2>
            <p className="text-[#C1FF00] text-[8px] font-bold uppercase tracking-[0.3em] mt-1">
              Encrypted Session Link
            </p>
          </div>
          <button 
            onClick={onCancel} 
            className="text-zinc-700 hover:text-white transition-colors uppercase text-[10px] font-black"
          >
            [Cancel]
          </button>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-950/20 border border-red-900/50 text-red-500 text-[10px] font-mono leading-relaxed"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <>
              <div className="space-y-2">
                <label className="text-zinc-600 text-[8px] font-bold uppercase tracking-widest">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-black border border-zinc-900 p-4 text-white outline-none focus:border-[#C1FF00] transition-colors font-mono text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-zinc-600 text-[8px] font-bold uppercase tracking-widest">Phone</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black border border-zinc-900 p-4 text-white outline-none focus:border-[#C1FF00] transition-colors font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-600 text-[8px] font-bold uppercase tracking-widest">Governorate</label>
                  <input
                    required
                    type="text"
                    value={formData.governorate}
                    onChange={e => setFormData({ ...formData, governorate: e.target.value })}
                    className="w-full bg-black border border-zinc-900 p-4 text-white outline-none focus:border-[#C1FF00] transition-colors font-mono text-sm"
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="text-zinc-600 text-[8px] font-bold uppercase tracking-widest">Email Identity</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-black border border-zinc-900 p-4 text-white outline-none focus:border-[#C1FF00] transition-colors font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-600 text-[8px] font-bold uppercase tracking-widest">Access Key</label>
            <input
              required
              type="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-black border border-zinc-900 p-4 text-white outline-none focus:border-[#C1FF00] transition-colors font-mono text-sm"
            />
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className={`w-full py-5 font-black uppercase tracking-[0.4em] text-xs transition-all relative overflow-hidden group ${
              isSubmitting ? 'bg-zinc-800 text-zinc-500' : 'bg-[#C1FF00] text-black hover:neon-shadow-strong'
            }`}
          >
            {isSubmitting ? 'Scanning...' : mode === 'login' ? 'Initialize_Link' : 'Create_Identity'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-zinc-900 text-center">
          <button 
            onClick={onSwitch}
            className="text-zinc-500 hover:text-[#C1FF00] transition-colors text-[10px] font-bold uppercase tracking-widest"
          >
            {mode === 'login' ? 'No Access? Request Identity' : 'Existing Identity? Sign In'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Fixed the missing default export
export default Auth;
