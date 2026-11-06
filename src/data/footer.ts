/**
 * Footer Data
 * Controls the footer link columns and structure.
 */

import type { FooterConfig } from '@/types';

export const footerData: FooterConfig = {
  columns: [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Our Services', href: '/services' },
        { label: 'Insights', href: '/insights' },
        { label: 'Meet the Team', href: '/team' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Book a Consultation', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Real Estate Brokerage', href: '/services#real-estate' },
        { label: 'Property Management', href: '/services#property-management' },
        { label: 'Retirement & Financial Planning', href: '/services#retirement-planning' },
        { label: 'Financial & Cooperative Advisory', href: '/services#advisory' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Latest Insights & Research', href: '/insights' },
        { label: 'Cooperative Governance Directives', href: '/insights?category=cooperative' },
        { label: 'Tax & Regulatory Compliance', href: '/insights?category=tax' },
        { label: 'NFRS & Audit Standards', href: '/insights?category=accounting' },
        { label: 'Property Due Diligence Guide', href: '/insights?category=real-estate' },
        { label: 'Frequently Asked Questions', href: '/contact#faq' },
      ],
    },
  ],
  certifications: [
    'Company Registration No. 26095/060/061',
    'PAN No. 301629579',
    'Old Baneshwor, KMC-31, Kathmandu, Nepal',
    '☎ +977-985-109-3898',
  ],
  newsletterTitle: 'Stay Informed',
  newsletterDescription:
    'Receive our monthly insights on cooperative finance, tax updates, and regulatory changes.',
};
