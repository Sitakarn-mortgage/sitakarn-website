/**
 * Centralized Image Registry
 * All image sources are defined here. Components never reference image paths directly.
 * Swap these URLs with real assets when available.
 *
 * Using Unsplash for professional corporate photography placeholders.
 * Format: https://images.unsplash.com/photo-{id}?w={width}&q=80&fit=crop
 */

export const images = {
  // ─── Hero & General ────────────────────────────────────────────────────────
  hero: {
    main: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&fit=crop',
    about: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80&fit=crop',
    contact: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=1200&q=80&fit=crop',
    services: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80&fit=crop',
    team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80&fit=crop',
    insights: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=80&fit=crop',
  },

  // ─── About Page ────────────────────────────────────────────────────────────
  about: {
    office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop',
    team: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80&fit=crop',
    community: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900&q=80&fit=crop',
    meeting: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=900&q=80&fit=crop',
  },

  // ─── Team Photos ───────────────────────────────────────────────────────────
  team: {
    member1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=face',
    member2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&fit=crop&crop=face',
    member3: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fit=crop&crop=face',
    member4: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&fit=crop&crop=face',
    member5: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop&crop=face',
    member6: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&fit=crop&crop=face',
    member7: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fit=crop&crop=face',
    member8: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80&fit=crop&crop=face',
  },

  // ─── Blog / Insights ───────────────────────────────────────────────────────
  blog: {
    post1: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&fit=crop',
    post2: 'https://images.unsplash.com/photo-1565514020179-026b92b2d70b?w=600&q=80&fit=crop',
    post3: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80&fit=crop',
    post4: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=600&q=80&fit=crop',
    post5: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&fit=crop',
    post6: 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=600&q=80&fit=crop',
  },

  // ─── Logos / Certifications (placeholder) ──────────────────────────────────
  // These would be replaced with actual certification logos
  certifications: {
    cpa: '/assets/certifications/cpa.svg',
    faa: '/assets/certifications/faa.svg',
    icpat: '/assets/certifications/icpat.svg',
  },
} as const;

export type Images = typeof images;
