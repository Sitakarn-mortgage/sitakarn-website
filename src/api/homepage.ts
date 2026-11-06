/**
 * Homepage API
 * Fetches homepage data from Strapi CMS.
 * Falls back to static data when the CMS is not configured.
 */

import type { APIResponse, HomepageData } from '@/types';
import type { HeroContent, ProcessStep, WhoWeHelp, WhyChooseUs, Statistic } from '@/types';
import { heroData, whoWeHelpData, whyChooseUsData, processStepsData } from '@/data/homepage';
import { statisticsData } from '@/data/statistics';
import { images } from '@/assets/images';
import { isCmsEnabled, fetchSingle, fetchCollection, getStrapiMediaUrl } from '@/lib/strapi';

// ─── Default Homepage Data ───────────────────────────────────────────────────

export const defaultHomepageData: HomepageData = {
  hero: {
    ...heroData,
    heroImageUrl: images.hero.main,
  },
  sections: {
    whoWeHelp: {
      eyebrow: 'Target Audience',
      title: 'Who We Serve',
      description:
        'From property buyers and sellers to cooperatives, banks, and SMEs — Sitakarn delivers tailored real estate brokerage and financial advisory solutions across Nepal.',
    },
    services: {
      eyebrow: 'Our Expertise',
      title: 'Comprehensive Property & Financial Services',
      description:
        'From verified property listings and buyer matching to financial advisory for cooperatives — Sitakarn covers the complete lifecycle.',
    },
    whyChooseUs: {
      eyebrow: 'Why Sitakarn',
      title: "Nepal's Professional Property & Financial Partner",
      description:
        'Established in 2003, Sitakarn combines pioneering real estate brokerage with expert financial advisory — built on transparency, compliance, and technology-enabled service delivery.',
    },
    process: {
      eyebrow: 'How We Work',
      title: 'Our Structured Process',
      description:
        'From initial assessment and property verification to title transfer and compliance — our 20-step transaction and advisory methodology delivers measurable, legally compliant results.',
    },
    testimonials: {
      eyebrow: 'Client Success',
      title: 'Trusted by Leaders',
    },
    insights: {
      eyebrow: 'Resources & Insights',
      title: 'Latest Perspectives',
      description:
        'Stay informed with our analysis of regulatory changes, tax updates, and cooperative finance best practices.',
    },
  },
  bottomCta: {
    headline: 'Ready to buy, sell, or strengthen your financial foundation?',
    description:
      'Contact us for a complimentary initial consultation. Whether you are buying or selling property, or strengthening a financial institution, we are here to help.',
    primaryCTA: { label: 'Book a Consultation', href: '/contact' },
    secondaryCTA: { label: 'Explore Services', href: '/services' },
  },
};

// ─── Strapi → App type mappers ───────────────────────────────────────────────

function mapHero(d: Record<string, unknown>): HeroContent {
  const heroImage = d.heroImage as { url?: string } | undefined;
  const heroImageUrl = heroImage?.url
    ? getStrapiMediaUrl(heroImage.url)
    : images.hero.main;

  return {
    eyebrow: (d.eyebrow as string) ?? defaultHomepageData.hero.eyebrow,
    headline: (d.headline as string) ?? defaultHomepageData.hero.headline,
    subheadline: (d.subheadline as string) ?? defaultHomepageData.hero.subheadline,
    heroImageUrl,
    primaryCTA: {
      label:
        ((d.primaryCTALabel as string) ?? (d.primaryCTA as Record<string, string>)?.label) ??
        defaultHomepageData.hero.primaryCTA.label,
      href:
        ((d.primaryCTAHref as string) ?? (d.primaryCTA as Record<string, string>)?.href) ??
        defaultHomepageData.hero.primaryCTA.href,
    },
    secondaryCTA: {
      label:
        ((d.secondaryCTALabel as string) ?? (d.secondaryCTA as Record<string, string>)?.label) ??
        defaultHomepageData.hero.secondaryCTA.label,
      href:
        ((d.secondaryCTAHref as string) ?? (d.secondaryCTA as Record<string, string>)?.href) ??
        defaultHomepageData.hero.secondaryCTA.href,
    },
  };
}

function mapHomepage(d: Record<string, unknown>): HomepageData {
  return {
    hero: mapHero(d),
    sections: {
      whoWeHelp: {
        eyebrow: (d.whoWeHelpEyebrow as string) || defaultHomepageData.sections.whoWeHelp.eyebrow,
        title: (d.whoWeHelpTitle as string) || defaultHomepageData.sections.whoWeHelp.title,
        description: (d.whoWeHelpDescription as string) || defaultHomepageData.sections.whoWeHelp.description,
      },
      services: {
        eyebrow: (d.servicesEyebrow as string) || defaultHomepageData.sections.services.eyebrow,
        title: (d.servicesTitle as string) || defaultHomepageData.sections.services.title,
        description: (d.servicesDescription as string) || defaultHomepageData.sections.services.description,
      },
      whyChooseUs: {
        eyebrow: (d.whyChooseUsEyebrow as string) || defaultHomepageData.sections.whyChooseUs.eyebrow,
        title: (d.whyChooseUsTitle as string) || defaultHomepageData.sections.whyChooseUs.title,
        description: (d.whyChooseUsDescription as string) || defaultHomepageData.sections.whyChooseUs.description,
      },
      process: {
        eyebrow: (d.processEyebrow as string) || defaultHomepageData.sections.process.eyebrow,
        title: (d.processTitle as string) || defaultHomepageData.sections.process.title,
        description: (d.processDescription as string) || defaultHomepageData.sections.process.description,
      },
      testimonials: {
        eyebrow: (d.testimonialsEyebrow as string) || defaultHomepageData.sections.testimonials.eyebrow,
        title: (d.testimonialsTitle as string) || defaultHomepageData.sections.testimonials.title,
        description: (d.testimonialsDescription as string) || undefined,
      },
      insights: {
        eyebrow: (d.insightsEyebrow as string) || defaultHomepageData.sections.insights.eyebrow,
        title: (d.insightsTitle as string) || defaultHomepageData.sections.insights.title,
        description: (d.insightsDescription as string) || defaultHomepageData.sections.insights.description,
      },
    },
    bottomCta: {
      headline: (d.bottomCtaHeadline as string) || defaultHomepageData.bottomCta.headline,
      description: (d.bottomCtaDescription as string) || defaultHomepageData.bottomCta.description,
      primaryCTA: {
        label: (d.bottomCtaPrimaryLabel as string) || defaultHomepageData.bottomCta.primaryCTA.label,
        href: (d.bottomCtaPrimaryHref as string) || defaultHomepageData.bottomCta.primaryCTA.href,
      },
      secondaryCTA: {
        label: (d.bottomCtaSecondaryLabel as string) || defaultHomepageData.bottomCta.secondaryCTA.label,
        href: (d.bottomCtaSecondaryHref as string) || defaultHomepageData.bottomCta.secondaryCTA.href,
      },
    },
  };
}

function mapWhoWeHelp(d: Record<string, unknown>): WhoWeHelp {
  return {
    id: String(d.documentId ?? d.id ?? ''),
    title: (d.title as string) ?? '',
    description: (d.description as string) ?? '',
    icon: (d.icon as string) ?? 'HelpCircle',
  };
}

function mapWhyChooseUs(d: Record<string, unknown>): WhyChooseUs {
  return {
    id: String(d.documentId ?? d.id ?? ''),
    title: (d.title as string) ?? '',
    description: (d.description as string) ?? '',
    icon: (d.icon as string) ?? 'Star',
  };
}

function mapProcessStep(d: Record<string, unknown>): ProcessStep {
  return {
    step: (d.step as number) ?? 0,
    title: (d.title as string) ?? '',
    description: (d.description as string) ?? '',
    icon: (d.icon as string) ?? 'Circle',
  };
}

function mapStatistic(d: Record<string, unknown>): Statistic {
  return {
    id: String(d.documentId ?? d.id ?? ''),
    value: (d.value as string) ?? '',
    label: (d.label as string) ?? '',
    description: (d.description as string) ?? undefined,
    icon: (d.icon as string) ?? undefined,
  };
}

// ─── API methods ─────────────────────────────────────────────────────────────

export const HomepageAPI = {
  async getPage(): Promise<APIResponse<HomepageData>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchSingle<Record<string, unknown>>('homepage', {
          populate: 'heroImage',
        });
        return {
          data: mapHomepage(res.data),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[HomepageAPI.getPage] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: defaultHomepageData,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getHero(): Promise<APIResponse<HeroContent>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchSingle<Record<string, unknown>>('homepage', {
          populate: '*',
        });
        return {
          data: mapHero(res.data),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[HomepageAPI.getHero] CMS fetch failed, using fallback:', err);
      }
    }
    // Fallback to static data
    return {
      data: defaultHomepageData.hero,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getWhoWeHelp(): Promise<APIResponse<WhoWeHelp[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('who-we-helps', {
          sort: 'order:asc',
          pagination: { pageSize: 100 },
        });
        return {
          data: res.data.map(mapWhoWeHelp),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[HomepageAPI.getWhoWeHelp] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: whoWeHelpData,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getWhyChooseUs(): Promise<APIResponse<WhyChooseUs[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('why-choose-uses', {
          sort: 'order:asc',
          pagination: { pageSize: 100 },
        });
        return {
          data: res.data.map(mapWhyChooseUs),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[HomepageAPI.getWhyChooseUs] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: whyChooseUsData,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getProcessSteps(): Promise<APIResponse<ProcessStep[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('process-steps', {
          sort: 'step:asc',
          pagination: { pageSize: 100 },
        });
        return {
          data: res.data.map(mapProcessStep),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[HomepageAPI.getProcessSteps] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: processStepsData,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getStatistics(): Promise<APIResponse<Statistic[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('statistics', {
          sort: 'order:asc',
          pagination: { pageSize: 100 },
        });
        return {
          data: res.data.map(mapStatistic),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[HomepageAPI.getStatistics] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: statisticsData,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
