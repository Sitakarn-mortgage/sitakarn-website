/**
 * Pages API
 * Fetches page single-type data (Services, Team, Contact) from Strapi CMS.
 * Falls back to static defaults when CMS is unavailable or unconfigured.
 */

import type {
  APIResponse,
  ServicesPageData,
  TeamPageData,
  ContactPageData,
} from '@/types';
import { images } from '@/assets/images';
import { isCmsEnabled, fetchSingle, getStrapiMediaUrl } from '@/lib/strapi';

// ─── Default Page Data ────────────────────────────────────────────────────────

export const defaultServicesPageData: ServicesPageData = {
  heroEyebrow: 'Our Capabilities',
  heroTitle: 'Integrated Property & Financial Services',
  heroDescription:
    'Sitakarn Mortgage Pvt. Ltd. offers four integrated pillars of professional services, combining expertise across real estate, property management, retirement and financial planning, and professional advisory services.',
  heroImageUrl: images.hero.services,
  seoTitle: 'Our Services',
  seoDescription:
    'Professional real estate brokerage, property due diligence, and financial advisory services for cooperatives, buyers, sellers, and institutions across Nepal.',
};

export const defaultTeamPageData: TeamPageData = {
  heroEyebrow: 'Our People',
  heroTitle: 'Expertise You Can Trust',
  heroDescription:
    'Our practice is led by Certified Public Accountants (CPAs), former revenue department officers, and registered cooperative advisors.',
  heroImageUrl: images.hero.team,
  leadershipEyebrow: 'Partners',
  leadershipTitle: 'Leadership Team',
  consultantsEyebrow: 'Professionals',
  consultantsTitle: 'Consultants & Specialists',
  seoTitle: 'Our Team',
  seoDescription:
    'Meet our leadership and team of certified financial consultants, CPAs, and cooperative advisors.',
};

export const defaultContactPageData: ContactPageData = {
  heroEyebrow: 'Get in Touch',
  heroTitle: "Let's Discuss Your Needs",
  heroDescription:
    "Contact us to schedule a complimentary initial assessment. We'll review your current financial situation and outline how we can support your organization.",
  heroImageUrl: images.hero.contact,
  formTitle: 'Send an Inquiry',
  socialTitle: 'Follow Us',
  socialDescription:
    'Stay updated on property listings, financial insights, and company news.',
  faqEyebrow: 'Common Questions',
  faqTitle: 'Frequently Asked Questions',
  seoTitle: 'Contact Us',
  seoDescription:
    'Get in touch with Sitakarn Financial Consulting for a complimentary initial assessment.',
};

// ─── Strapi → App Type Mappers ────────────────────────────────────────────────

function mapServicesPage(d: Record<string, unknown>): ServicesPageData {
  const heroImage = d.heroImage as { url?: string } | undefined;
  return {
    heroEyebrow: (d.heroEyebrow as string) || defaultServicesPageData.heroEyebrow,
    heroTitle: (d.heroTitle as string) || defaultServicesPageData.heroTitle,
    heroDescription: (d.heroDescription as string) || defaultServicesPageData.heroDescription,
    heroImageUrl: heroImage?.url
      ? getStrapiMediaUrl(heroImage.url)
      : defaultServicesPageData.heroImageUrl,
    seoTitle: (d.seoTitle as string) || defaultServicesPageData.seoTitle,
    seoDescription: (d.seoDescription as string) || defaultServicesPageData.seoDescription,
  };
}

function mapTeamPage(d: Record<string, unknown>): TeamPageData {
  const heroImage = d.heroImage as { url?: string } | undefined;
  return {
    heroEyebrow: (d.heroEyebrow as string) || defaultTeamPageData.heroEyebrow,
    heroTitle: (d.heroTitle as string) || defaultTeamPageData.heroTitle,
    heroDescription: (d.heroDescription as string) || defaultTeamPageData.heroDescription,
    heroImageUrl: heroImage?.url
      ? getStrapiMediaUrl(heroImage.url)
      : defaultTeamPageData.heroImageUrl,
    leadershipEyebrow: (d.leadershipEyebrow as string) || defaultTeamPageData.leadershipEyebrow,
    leadershipTitle: (d.leadershipTitle as string) || defaultTeamPageData.leadershipTitle,
    consultantsEyebrow: (d.consultantsEyebrow as string) || defaultTeamPageData.consultantsEyebrow,
    consultantsTitle: (d.consultantsTitle as string) || defaultTeamPageData.consultantsTitle,
    seoTitle: (d.seoTitle as string) || defaultTeamPageData.seoTitle,
    seoDescription: (d.seoDescription as string) || defaultTeamPageData.seoDescription,
  };
}

function mapContactPage(d: Record<string, unknown>): ContactPageData {
  const heroImage = d.heroImage as { url?: string } | undefined;
  return {
    heroEyebrow: (d.heroEyebrow as string) || defaultContactPageData.heroEyebrow,
    heroTitle: (d.heroTitle as string) || defaultContactPageData.heroTitle,
    heroDescription: (d.heroDescription as string) || defaultContactPageData.heroDescription,
    heroImageUrl: heroImage?.url
      ? getStrapiMediaUrl(heroImage.url)
      : defaultContactPageData.heroImageUrl,
    formTitle: (d.formTitle as string) || defaultContactPageData.formTitle,
    socialTitle: (d.socialTitle as string) || defaultContactPageData.socialTitle,
    socialDescription: (d.socialDescription as string) || defaultContactPageData.socialDescription,
    faqEyebrow: (d.faqEyebrow as string) || defaultContactPageData.faqEyebrow,
    faqTitle: (d.faqTitle as string) || defaultContactPageData.faqTitle,
    seoTitle: (d.seoTitle as string) || defaultContactPageData.seoTitle,
    seoDescription: (d.seoDescription as string) || defaultContactPageData.seoDescription,
  };
}

// ─── API Methods ─────────────────────────────────────────────────────────────

export const PagesAPI = {
  async getServicesPage(): Promise<APIResponse<ServicesPageData>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchSingle<Record<string, unknown>>('services-page', {
          populate: 'heroImage',
        });
        return {
          data: mapServicesPage(res.data),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[PagesAPI.getServicesPage] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: defaultServicesPageData,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getTeamPage(): Promise<APIResponse<TeamPageData>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchSingle<Record<string, unknown>>('team-page', {
          populate: 'heroImage',
        });
        return {
          data: mapTeamPage(res.data),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[PagesAPI.getTeamPage] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: defaultTeamPageData,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getContactPage(): Promise<APIResponse<ContactPageData>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchSingle<Record<string, unknown>>('contact-page', {
          populate: 'heroImage',
        });
        return {
          data: mapContactPage(res.data),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[PagesAPI.getContactPage] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: defaultContactPageData,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
