
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WebsiteContent, Project, Experience, Testimonial, Certificate, ClientLogo } from '../types';

interface AdminPanelProps {
  content: WebsiteContent;
  onUpdate: (newContent: WebsiteContent) => void;
  onClose: () => void;
}

type AdminSection = 'hero' | 'about' | 'portfolio' | 'experience' | 'testimonials' | 'clients' | 'certificates';

const AdminPanel: React.FC<AdminPanelProps> = ({ content, onUpdate, onClose }) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('hero');
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const handleUpdate = (updates: Partial<WebsiteContent>) => {
    onUpdate({ ...content, ...updates });
  };

  const simulateUpload = (id: string, file: File, callback: (url: string) => void) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 35;
      if (progress >= 100) {
        progress = 100;
        setUploadProgress(prev => ({ ...prev, [id]: 100 }));
        clearInterval(interval);
        
        const reader = new FileReader();
        reader.onload = (e) => {
          callback(e.target?.result as string);
          setTimeout(() => setUploadProgress(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
          }), 800);
        };
        reader.readAsDataURL(file);
      } else {
        setUploadProgress(prev => ({ ...prev, [id]: Math.round(progress) }));
      }
    }, 150);
  };

  const DropZone = ({ id, currentImage, onUpload, label, aspect = "aspect-video" }: { id: string, currentImage: string, onUpload: (file: File) => void, label: string, aspect?: string }) => (
    <div className={`relative group ${aspect}`}>
      <div 
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault();
          if (e.dataTransfer.files[0]) onUpload(e.dataTransfer.files[0]);
        }}
        className="w-full h-full bg-zinc-900 border border-zinc-800 hover:border-[#C1FF00] transition-colors flex flex-col items-center justify-center overflow-hidden relative"
      >
        {currentImage ? (
          <img src={currentImage} className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all" />
        ) : (
          <div className="text-zinc-700 text-center p-4">
            <span className="text-2xl block mb-2">📸</span>
            <p className="text-[8px] uppercase font-bold tracking-widest">{label}</p>
          </div>
        )}
        
        {uploadProgress[id] && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 z-20">
            <p className="text-[#C1FF00] text-[9px] font-black mb-2 uppercase tracking-widest">Processing_{uploadProgress[id]}%</p>
            <div className="w-full h-0.5 bg-zinc-800 max-w-[80px]">
              <motion.div animate={{ width: `${uploadProgress[id]}%` }} className="h-full bg-[#C1FF00]" />
            </div>
          </div>
        )}

        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => e.target.files && onUpload(e.target.files[0])} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] flex text-zinc-400 font-mono text-xs select-none">
      <aside className="w-64 border-r border-zinc-900 bg-black p-6 flex flex-col">
        <div className="mb-10 px-2">
          <h1 className="text-white font-black tracking-[0.3em] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C1FF00] rounded-full shadow-[0_0_10px_#C1FF00]"></span>
            Aura_Core
          </h1>
        </div>

        <nav className="space-y-1 flex-1">
          {(['hero', 'about', 'portfolio', 'experience', 'testimonials', 'clients', 'certificates'] as AdminSection[]).map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-full text-left px-4 py-3 uppercase tracking-widest font-bold transition-all border-l-2 ${
                activeSection === section ? 'bg-zinc-900/50 text-[#C1FF00] border-[#C1FF00]' : 'text-zinc-600 border-transparent hover:text-white'
              }`}
            >
              {section}
            </button>
          ))}
        </nav>

        <button onClick={onClose} className="mt-10 p-4 border border-zinc-800 text-white font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Exit_Session
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto p-12 bg-grid">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 border-b border-zinc-900 pb-6">
            <h2 className="text-3xl font-display font-black text-white italic uppercase tracking-tighter">{activeSection}_Manager</h2>
            <p className="text-zinc-600 uppercase tracking-widest text-[10px] mt-1">Real-time persistence active</p>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-10"
            >
              {activeSection === 'hero' && (
                <div className="grid gap-8">
                  <div className="bg-zinc-950 p-6 border border-zinc-900 space-y-4">
                    <label className="text-[10px] uppercase font-black text-zinc-700 tracking-widest">Primary Identity</label>
                    <input value={content.heroTitle} onChange={e => handleUpdate({ heroTitle: e.target.value })} className="w-full bg-black border border-zinc-800 p-4 text-xl font-bold text-white outline-none focus:border-[#C1FF00]" />
                  </div>
                  <div className="bg-zinc-950 p-6 border border-zinc-900 space-y-4">
                    <label className="text-[10px] uppercase font-black text-zinc-700 tracking-widest">Tagline</label>
                    <textarea value={content.heroTagline} onChange={e => handleUpdate({ heroTagline: e.target.value })} className="w-full bg-black border border-zinc-800 p-4 text-zinc-400 outline-none focus:border-[#C1FF00] resize-none h-32" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-zinc-950 p-6 border border-zinc-900 space-y-4">
                      <label className="text-[10px] uppercase font-black text-zinc-700 tracking-widest">Hero Image</label>
                      <DropZone id="hero" currentImage={content.heroImage} onUpload={f => simulateUpload('hero', f, url => handleUpdate({ heroImage: url }))} label="Drop Hero Art" />
                    </div>
                    <div className="bg-zinc-950 p-6 border border-zinc-900 space-y-4">
                      <label className="text-[10px] uppercase font-black text-zinc-700 tracking-widest">CTA Text</label>
                      <input value={content.ctaText} onChange={e => handleUpdate({ ctaText: e.target.value })} className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-[#C1FF00] font-bold" />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'about' && (
                <div className="grid gap-8">
                  <div className="bg-zinc-950 p-6 border border-zinc-900 space-y-4">
                    <label className="text-[10px] uppercase font-black text-zinc-700 tracking-widest">About Summary</label>
                    <textarea value={content.aboutText} onChange={e => handleUpdate({ aboutText: e.target.value })} className="w-full bg-black border border-zinc-800 p-4 text-zinc-400 outline-none focus:border-[#C1FF00] resize-none h-48" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-zinc-950 p-6 border border-zinc-900 space-y-4">
                      <label className="text-[10px] uppercase font-black text-zinc-700 tracking-widest">About Image</label>
                      <DropZone id="about_img" currentImage={content.aboutImage} onUpload={f => simulateUpload('about_img', f, url => handleUpdate({ aboutImage: url }))} label="Drop Portrait" />
                    </div>
                    <div className="bg-zinc-950 p-6 border border-zinc-900 space-y-4">
                      <label className="text-[10px] uppercase font-black text-zinc-700 tracking-widest">Skills (Comma Separated)</label>
                      <textarea value={content.skills.join(', ')} onChange={e => handleUpdate({ skills: e.target.value.split(',').map(s => s.trim()) })} className="w-full bg-black border border-zinc-800 p-4 text-[#C1FF00] outline-none focus:border-[#C1FF00] h-32" />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'portfolio' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[10px] text-zinc-600 italic">Sorting Logic: Date (Desc)</p>
                    <button onClick={() => handleUpdate({ projects: [{ id: Date.now().toString(), title: "UNNAMED_OP", description: "", date: new Date().toISOString().split('T')[0], category: "GENERAL", imageUrl: "", order: 0 }, ...content.projects] })} className="text-[#C1FF00] font-black uppercase text-[10px] tracking-widest">+ Append Project</button>
                  </div>
                  {content.projects.map(p => (
                    <div key={p.id} className="bg-zinc-950 border border-zinc-900 p-6 flex gap-6">
                      <div className="w-40 h-40">
                        <DropZone id={p.id} aspect="h-full w-full" currentImage={p.imageUrl} onUpload={f => simulateUpload(p.id, f, url => handleUpdate({ projects: content.projects.map(item => item.id === p.id ? { ...item, imageUrl: url } : item) }))} label="Upload Thumbnail" />
                      </div>
                      <div className="flex-1 grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input placeholder="Project Title" value={p.title} onChange={e => handleUpdate({ projects: content.projects.map(item => item.id === p.id ? { ...item, title: e.target.value } : item) })} className="bg-black border border-zinc-800 p-2 text-white font-bold outline-none" />
                          <input type="date" value={p.date} onChange={e => handleUpdate({ projects: content.projects.map(item => item.id === p.id ? { ...item, date: e.target.value } : item) })} className="bg-black border border-zinc-800 p-2 text-zinc-500 outline-none" />
                        </div>
                        <input placeholder="Category" value={p.category} onChange={e => handleUpdate({ projects: content.projects.map(item => item.id === p.id ? { ...item, category: e.target.value } : item) })} className="bg-black border border-zinc-800 p-2 text-[#C1FF00] text-[10px] uppercase font-black tracking-widest outline-none" />
                        <textarea placeholder="Brief" value={p.description} onChange={e => handleUpdate({ projects: content.projects.map(item => item.id === p.id ? { ...item, description: e.target.value } : item) })} className="bg-black border border-zinc-800 p-2 text-zinc-500 text-[11px] h-16 resize-none outline-none" />
                        <button onClick={() => handleUpdate({ projects: content.projects.filter(item => item.id !== p.id) })} className="text-red-900 text-[9px] uppercase font-black hover:text-red-500 text-left">Remove_Entry</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'experience' && (
                <div className="space-y-6">
                  <button onClick={() => handleUpdate({ experiences: [{ id: Date.now().toString(), title: "ROLE_NAME", company: "ORG", date: "20XX - 20XX", description: "" }, ...content.experiences] })} className="text-[#C1FF00] font-black uppercase text-[10px] tracking-widest">+ Add Experience</button>
                  {content.experiences.map(e => (
                    <div key={e.id} className="bg-zinc-950 border border-zinc-900 p-6 grid gap-4">
                      <div className="grid grid-cols-3 gap-4">
                        <input placeholder="Title" value={e.title} onChange={val => handleUpdate({ experiences: content.experiences.map(item => item.id === e.id ? { ...item, title: val.target.value } : item) })} className="bg-black border border-zinc-800 p-2 text-white outline-none" />
                        <input placeholder="Company" value={e.company} onChange={val => handleUpdate({ experiences: content.experiences.map(item => item.id === e.id ? { ...item, company: val.target.value } : item) })} className="bg-black border border-zinc-800 p-2 text-white outline-none" />
                        <input placeholder="Date Range" value={e.date} onChange={val => handleUpdate({ experiences: content.experiences.map(item => item.id === e.id ? { ...item, date: val.target.value } : item) })} className="bg-black border border-zinc-800 p-2 text-zinc-500 outline-none" />
                      </div>
                      <textarea placeholder="Responsibilities" value={e.description} onChange={val => handleUpdate({ experiences: content.experiences.map(item => item.id === e.id ? { ...item, description: val.target.value } : item) })} className="bg-black border border-zinc-800 p-2 text-zinc-500 outline-none resize-none h-20" />
                      <button onClick={() => handleUpdate({ experiences: content.experiences.filter(item => item.id !== e.id) })} className="text-red-900 text-[9px] uppercase font-black hover:text-red-500 text-left">Remove_Exp</button>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'testimonials' && (
                <div className="space-y-6">
                  <button onClick={() => handleUpdate({ testimonials: [{ id: Date.now().toString(), clientName: "NAME", content: "", clientImage: "", hidden: false }, ...content.testimonials] })} className="text-[#C1FF00] font-black uppercase text-[10px] tracking-widest">+ New Review</button>
                  {content.testimonials.map(t => (
                    <div key={t.id} className="bg-zinc-950 border border-zinc-900 p-6 flex gap-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                        <DropZone id={t.id} aspect="h-full w-full" currentImage={t.clientImage} onUpload={f => simulateUpload(t.id, f, url => handleUpdate({ testimonials: content.testimonials.map(item => item.id === t.id ? { ...item, clientImage: url } : item) }))} label="Img" />
                      </div>
                      <div className="flex-1 grid gap-3">
                        <div className="flex justify-between">
                          <input value={t.clientName} onChange={e => handleUpdate({ testimonials: content.testimonials.map(item => item.id === t.id ? { ...item, clientName: e.target.value } : item) })} className="bg-black border border-zinc-800 p-2 text-white outline-none w-1/2" />
                          <button onClick={() => handleUpdate({ testimonials: content.testimonials.map(item => item.id === t.id ? { ...item, hidden: !item.hidden } : item) })} className={`px-4 py-1 text-[8px] font-black border ${t.hidden ? 'text-zinc-700 border-zinc-800' : 'text-[#C1FF00] border-[#C1FF00]'}`}>
                            {t.hidden ? 'HIDDEN' : 'VISIBLE'}
                          </button>
                        </div>
                        <textarea value={t.content} onChange={e => handleUpdate({ testimonials: content.testimonials.map(item => item.id === t.id ? { ...item, content: e.target.value } : item) })} className="bg-black border border-zinc-800 p-2 text-zinc-500 outline-none h-20 resize-none" />
                        <button onClick={() => handleUpdate({ testimonials: content.testimonials.filter(item => item.id !== t.id) })} className="text-red-900 text-[9px] font-black hover:text-red-500">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'clients' && (
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-4 mb-4">
                    <button onClick={() => handleUpdate({ clients: [{ id: Date.now().toString(), logoUrl: "", hidden: false }, ...content.clients] })} className="text-[#C1FF00] font-black uppercase text-[10px] tracking-widest">+ Add Logo</button>
                  </div>
                  {content.clients.map(c => (
                    <div key={c.id} className="bg-zinc-950 border border-zinc-900 p-4 space-y-3">
                      <DropZone id={c.id} currentImage={c.logoUrl} onUpload={f => simulateUpload(c.id, f, url => handleUpdate({ clients: content.clients.map(item => item.id === c.id ? { ...item, logoUrl: url } : item) }))} label="Logo" aspect="aspect-square" />
                      <div className="flex justify-between items-center px-1">
                        <button onClick={() => handleUpdate({ clients: content.clients.map(item => item.id === c.id ? { ...item, hidden: !item.hidden } : item) })} className={`text-[8px] font-bold ${c.hidden ? 'text-zinc-800' : 'text-[#C1FF00]'}`}>
                          {c.hidden ? 'HID' : 'VIS'}
                        </button>
                        <button onClick={() => handleUpdate({ clients: content.clients.filter(item => item.id !== c.id) })} className="text-red-900 text-[8px] font-bold hover:text-red-500">DEL</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'certificates' && (
                <div className="space-y-6">
                  <button onClick={() => handleUpdate({ certificates: [{ id: Date.now().toString(), title: "CERT_NAME", date: "20XX", imageUrl: "", hidden: false }, ...content.certificates] })} className="text-[#C1FF00] font-black uppercase text-[10px] tracking-widest">+ Add Certificate</button>
                  <div className="grid grid-cols-2 gap-6">
                    {content.certificates.map(cert => (
                      <div key={cert.id} className="bg-zinc-950 border border-zinc-900 p-6 space-y-4">
                        <DropZone id={cert.id} currentImage={cert.imageUrl} onUpload={f => simulateUpload(cert.id, f, url => handleUpdate({ certificates: content.certificates.map(item => item.id === cert.id ? { ...item, imageUrl: url } : item) }))} label="Cert PDF/Image" />
                        <div className="grid gap-2">
                          <input placeholder="Cert Title" value={cert.title} onChange={e => handleUpdate({ certificates: content.certificates.map(item => item.id === cert.id ? { ...item, title: e.target.value } : item) })} className="bg-black border border-zinc-800 p-2 text-white outline-none font-bold" />
                          <input placeholder="Date" value={cert.date} onChange={e => handleUpdate({ certificates: content.certificates.map(item => item.id === cert.id ? { ...item, date: e.target.value } : item) })} className="bg-black border border-zinc-800 p-2 text-zinc-500 outline-none" />
                        </div>
                        <div className="flex justify-between">
                          <button onClick={() => handleUpdate({ certificates: content.certificates.map(item => item.id === cert.id ? { ...item, hidden: !item.hidden } : item) })} className={`text-[9px] font-black ${cert.hidden ? 'text-zinc-800' : 'text-[#C1FF00]'}`}>
                            {cert.hidden ? 'SHOW_CERT' : 'HIDE_CERT'}
                          </button>
                          <button onClick={() => handleUpdate({ certificates: content.certificates.filter(item => item.id !== cert.id) })} className="text-red-900 text-[9px] font-black hover:text-red-500">REMOVE</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
