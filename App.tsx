
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_CONTENT } from './constants';
import { WebsiteContent, User } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Auth from './components/Auth';

const ADMIN_EMAIL = 'aly575490@gmail.com';

const App: React.FC = () => {
  const [content, setContent] = useState<WebsiteContent>(() => {
    const saved = localStorage.getItem('aura_portfolio_content_v4');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aura_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [view, setView] = useState<'home' | 'login' | 'signup' | 'admin'>('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    localStorage.setItem('aura_portfolio_content_v4', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (view === 'admin') {
      if (!currentUser) {
        setView('login');
      } else if (currentUser.email !== ADMIN_EMAIL) {
        setView('home');
      }
    }
    if ((view === 'login' || view === 'signup') && currentUser) {
      if (currentUser.email === ADMIN_EMAIL) {
        setView('admin');
      } else {
        setView('home');
      }
    }
  }, [view, currentUser]);

  const handleUpdateContent = useCallback((newContent: WebsiteContent) => {
    setContent(newContent);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('aura_current_user', JSON.stringify(user));
    if (user.email === ADMIN_EMAIL) {
      setView('admin');
    } else {
      setView('home');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('aura_current_user');
    setView('home');
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[100]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="text-4xl font-display font-black text-[#C1FF00] tracking-tighter"
        >
          AURA_SYSTEM_INIT
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#C1FF00] selection:text-black">
      <AnimatePresence mode="wait">
        {view === 'admin' && currentUser?.email === ADMIN_EMAIL ? (
          <motion.div
            key="admin-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AdminPanel 
              content={content} 
              onUpdate={handleUpdateContent} 
              onClose={() => setView('home')} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="public-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {view !== 'admin' && (
              <Navbar 
                currentUser={currentUser} 
                onLogout={handleLogout} 
                onAuthView={(v) => setView(v)}
                onAdminToggle={() => setView('admin')} 
              />
            )}
            
            {view === 'home' && (
              <>
                <main>
                  <Hero 
                    title={content.heroTitle} 
                    tagline={content.heroTagline}
                    image={content.heroImage}
                    ctaText={content.ctaText}
                  />
                  
                  {/* Experience Section */}
                  <section className="py-24 border-t border-zinc-900 bg-black">
                    <div className="max-w-7xl mx-auto px-6">
                      <div className="flex items-center gap-4 mb-20">
                        <span className="text-[#C1FF00] font-bold text-lg">/EX</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter">Career_Log</h2>
                      </div>
                      <div className="space-y-12">
                        {content.experiences.map((exp, i) => (
                          <div key={exp.id} className="grid md:grid-cols-[1fr_2fr] gap-8 border-b border-zinc-900 pb-12">
                            <p className="text-[#C1FF00] font-black uppercase tracking-widest text-xs">{exp.date}</p>
                            <div>
                              <h3 className="text-2xl font-display font-black text-white mb-2">{exp.title} // {exp.company}</h3>
                              <p className="text-zinc-500 max-w-2xl">{exp.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <About 
                    text={content.aboutText} 
                    skills={content.skills}
                    image={content.aboutImage}
                  />
                  
                  <Portfolio 
                    projects={content.projects} 
                  />

                  {/* Certificates Section */}
                  {content.certificates.some(c => !c.hidden) && (
                    <section className="py-24 border-t border-zinc-900">
                      <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center gap-4 mb-20">
                          <span className="text-[#C1FF00] font-bold text-lg">/CT</span>
                          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter italic">Accreditation</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {content.certificates.filter(c => !c.hidden).map(cert => (
                            <div key={cert.id} className="group border border-zinc-900 p-6 hover:border-[#C1FF00]/40 transition-colors">
                              <div className="aspect-[4/3] bg-zinc-900 mb-6 overflow-hidden">
                                <img src={cert.imageUrl} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={cert.title} />
                              </div>
                              <h4 className="text-white font-black uppercase text-xs tracking-widest mb-1">{cert.title}</h4>
                              <p className="text-zinc-600 text-[10px] uppercase font-bold">{cert.date}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  <Services 
                    services={content.services} 
                  />

                  {/* Testimonials Section */}
                  <section className="py-24 bg-[#050505] border-y border-zinc-900">
                    <div className="max-w-7xl mx-auto px-6">
                      <div className="grid md:grid-cols-2 gap-20">
                        {content.testimonials.filter(t => !t.hidden).map(t => (
                          <div key={t.id} className="relative p-10 border border-zinc-900 bg-black group overflow-hidden">
                            <div className="absolute top-0 right-0 w-2 h-2 bg-[#C1FF00] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <p className="text-zinc-400 text-lg italic leading-relaxed mb-8">"{t.content}"</p>
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full overflow-hidden grayscale">
                                <img src={t.clientImage} alt={t.clientName} />
                              </div>
                              <p className="text-white font-black uppercase tracking-widest text-[10px]">{t.clientName}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Client Logos Section */}
                  <section className="py-20 border-b border-zinc-900">
                    <div className="max-w-7xl mx-auto px-6">
                      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:opacity-80 transition-opacity duration-500">
                        {content.clients.filter(c => !c.hidden).map(client => (
                          <img key={client.id} src={client.logoUrl} className="h-8 md:h-12 w-auto object-contain" alt="Partner Logo" />
                        ))}
                      </div>
                    </div>
                  </section>

                  <Contact 
                    email={content.contactEmail} 
                  />
                </main>
                <Footer />
              </>
            )}

            {(view === 'login' || view === 'signup') && !currentUser && (
              <Auth 
                mode={view as 'login' | 'signup'} 
                onSuccess={handleLogin} 
                onSwitch={() => setView(view === 'login' ? 'signup' : 'login')}
                onCancel={() => setView('home')}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {currentUser?.email === ADMIN_EMAIL && view === 'home' && (
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={() => setView('admin')}
          className="fixed bottom-8 right-8 z-[60] bg-[#C1FF00] text-black px-6 py-3 rounded-none font-bold shadow-[0_0_20px_rgba(193,255,0,0.5)] hover:scale-105 transition-transform uppercase text-xs tracking-widest border border-black flex items-center gap-2 group"
        >
          <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
          Open Root Terminal
        </motion.button>
      )}
    </div>
  );
};

export default App;
