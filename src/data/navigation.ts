/**
 * Navigation Data
 * Centralized navigation structure. Edit here to update the navbar and sitemap.
 * The Services dropdown children are auto-generated from servicesData — no manual
 * sync needed. Add/rename a ServiceCategory and the nav updates automatically.
 */

import type { NavConfig } from '@/types';
import { servicesData } from '@/data/services';

export const navigationData: NavConfig = {
  links: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
      label: 'Services',
      href: '/services',
      children: servicesData.map((category) => ({
        label: category.title,
        href: `/services#${category.id}`,
      })),
    },
    { label: 'Insights', href: '/insights' },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: {
    label: 'Book Consultation',
    href: '/contact',
  },
};
