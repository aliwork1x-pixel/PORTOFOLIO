
export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  imageUrl: string;
  order: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  date: string;
  description: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  content: string;
  clientImage: string;
  hidden: boolean;
}

export interface ClientLogo {
  id: string;
  logoUrl: string;
  hidden: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  hidden: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface User {
  id: string;
  fullName: string;
  phone: string;
  governorate: string;
  whatsapp: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
}

export interface WebsiteContent {
  heroTitle: string;
  heroTagline: string;
  heroImage: string;
  ctaText: string;
  aboutText: string;
  aboutImage: string;
  skills: string[];
  projects: Project[];
  experiences: Experience[];
  testimonials: Testimonial[];
  clients: ClientLogo[];
  certificates: Certificate[];
  services: Service[];
  contactEmail: string;
}
