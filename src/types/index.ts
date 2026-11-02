/**
 * Shared TypeScript Types & Interfaces
 * All domain types used across the application.
 */

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface NavConfig {
  links: NavLink[];
  cta: {
    label: string;
    href: string;
  };
}

// ─── Services ─────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  slug: string;
  categoryId: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string; // Lucide icon name
  features: string[];
  targetAudience: string[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  /** One-line summary used in pillar cards and nav previews */
  shortDescription: string;
  /** Lucide icon name for the pillar card */
  icon: string;
  description: string;
  services: Service[];
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export type TeamRole = 'leadership' | 'consultant';

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  department: string;
  role: TeamRole;
  bio: string;
  qualifications: string[];
  imageUrl: string;
  linkedin?: string;
  email?: string;
  yearsOfExperience: number;
  specializations: string[];
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  organization: string;
  organizationType: 'cooperative' | 'sme' | 'ngo' | 'government' | 'other';
  rating: number; // 1–5
  featured: boolean;
}

// ─── Blog / Insights ──────────────────────────────────────────────────────────

export type BlogCategory =
  | 'cooperative-finance'
  | 'tax-update'
  | 'audit'
  | 'accounting'
  | 'training'
  | 'industry-news';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body?: string;
  category: BlogCategory;
  categoryLabel: string;
  author: string;
  publishedAt: string; // ISO date string
  readingTime: number; // minutes
  imageUrl: string;
  featured: boolean;
  tags: string[];
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// ─── Statistics ───────────────────────────────────────────────────────────────

export interface Statistic {
  id: string;
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

// ─── Partners / Certifications ────────────────────────────────────────────────

export interface Partner {
  id: string;
  name: string;
  shortCode?: string;
  logoUrl: string;
  website?: string;
  type: 'certification' | 'association' | 'partner';
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  heroImageUrl?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA: { label: string; href: string };
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface WhoWeHelp {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseUs {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterConfig {
  columns: FooterColumn[];
  certifications: string[];
  newsletterTitle?: string;
  newsletterDescription?: string;
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organization: string;
  organizationType: string;
  service: string;
  message: string;
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}

// ─── API Response ─────────────────────────────────────────────────────────────

export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ─── Company Info (Global Single Type) ────────────────────────────────────────
export interface CompanyAddress {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  full: string;
}

export interface OfficeHour {
  days: string;
  hours: string;
}

export interface SocialLinks {
  facebook: string;
  linkedin: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  x: string;
}

export interface CompanyInfo {
  name: string;
  fullName: string;
  tagline: string;
  wordmarkSubtitle: string;
  description: string;
  logoUrl?: string;
  faviconUrl?: string;
  faviconMime?: string;
  email: string;
  emailSupport: string;
  phone: string;
  phoneAlt: string;
  fax: string;
  address: CompanyAddress;
  maps: {
    embedUrl: string;
    directionsUrl: string;
  };
  officeHours: OfficeHour[];
  social: SocialLinks;
  taxId: string;
  registrationNumber: string;
  established: number;
  copyright: string;
}

// ─── Extended Homepage & Page Single Types ────────────────────────────────────
export interface SectionHeaderContent {
  eyebrow: string;
  title: string;
  description?: string;
}

export interface HomepageBottomCTA {
  headline: string;
  description: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA: { label: string; href: string };
}

export interface HomepageData {
  hero: HeroContent;
  sections: {
    whoWeHelp: SectionHeaderContent;
    services: SectionHeaderContent;
    whyChooseUs: SectionHeaderContent;
    process: SectionHeaderContent;
    testimonials: SectionHeaderContent;
    insights: SectionHeaderContent;
  };
  bottomCta: HomepageBottomCTA;
}

export interface ServicesPageData {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImageUrl: string;
  seoTitle: string;
  seoDescription: string;
}

export interface TeamPageData {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImageUrl: string;
  leadershipEyebrow: string;
  leadershipTitle: string;
  consultantsEyebrow: string;
  consultantsTitle: string;
  seoTitle: string;
  seoDescription: string;
}

export interface ContactPageData {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImageUrl: string;
  formTitle: string;
  socialTitle: string;
  socialDescription: string;
  faqEyebrow: string;
  faqTitle: string;
  seoTitle: string;
  seoDescription: string;
}

