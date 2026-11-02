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
        { label: 'Meet the Team', href: '/team' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Book a Consultation', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Professional Advisory Services', href: '/services#advisory' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Latest Insights', href: '/insights' },
        { label: 'Tax Calendar', href: '/resources/tax-calendar' },
        { label: 'Cooperative Law Guide', href: '/resources/cooperative-law' },
        { label: 'Accounting Standards', href: '/resources/standards' },
        { label: 'FAQ', href: '/contact#faq' },
        { label: 'Downloads', href: '/resources/downloads' },
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
