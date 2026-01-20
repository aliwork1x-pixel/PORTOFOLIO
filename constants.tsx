
import { WebsiteContent } from './types';

export const INITIAL_CONTENT: WebsiteContent = {
  heroTitle: "ALEX RIVERA",
  heroTagline: "Breaking the boundaries of digital aesthetics through high-contrast motion and experimental layout design.",
  heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  ctaText: "View Portfolio",
  aboutText: "I am a visual engineer focused on creating digital experiences that demand attention. By blending technical precision with creative chaos, I help brands navigate the intersection of art and interface.",
  aboutImage: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800",
  skills: ["Creative Direction", "Motion Systems", "Brand Evolution", "Interface Design"],
  projects: [
    {
      id: "1",
      title: "NEON DREAMS",
      description: "A cyberpunk visual exploration.",
      date: "2025-01-15",
      category: "Creative Direction",
      imageUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
      order: 0
    },
    {
      id: "2",
      title: "VOID SYSTEMS",
      description: "Minimalist UI evolution.",
      date: "2024-12-01",
      category: "UI Evolution",
      imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800",
      order: 1
    }
  ],
  experiences: [
    {
      id: "e1",
      title: "Senior Visual Designer",
      company: "Aura Labs",
      date: "2022 - Present",
      description: "Leading creative direction for high-fidelity digital products."
    }
  ],
  testimonials: [
    {
      id: "t1",
      clientName: "Sarah Jenkins",
      content: "Alex transformed our brand identity into something truly visionary.",
      clientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      hidden: false
    }
  ],
  clients: [
    { id: "c1", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", hidden: false }
  ],
  certificates: [
    {
      id: "cert1",
      title: "Advanced Motion Design",
      date: "2023",
      imageUrl: "https://images.unsplash.com/photo-1589330694653-960436d655f4?auto=format&fit=crop&q=80&w=400",
      hidden: false
    }
  ],
  services: [
    { id: "s1", title: "Brand Disrupt", description: "Identity systems for the modern age.", icon: "⚡" }
  ],
  contactEmail: "vision@alexrivera.design"
};
