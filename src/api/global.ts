/**
 * Global API
 * Fetches global single-type content (company info, navigation, footer) from Strapi v5.
 * Falls back cleanly to static config/data when CMS is offline or disabled.
 */

import type {
  APIResponse,
  CompanyAddress,
  CompanyInfo,
  FooterColumn,
  FooterConfig,
  NavConfig,
  NavLink,
  OfficeHour,
  SocialLinks,
} from '@/types';
import { company } from '@/config/company';
import { navigationData } from '@/data/navigation';
import { footerData } from '@/data/footer';
import { fetchSingle, getStrapiMediaUrl, isCmsEnabled } from '@/lib/strapi';

// ─── Static Fallbacks ─────────────────────────────────────────────────────────

export const defaultCompanyInfo: CompanyInfo = {
  name: company.name,
  fullName: company.fullName,
  tagline: company.tagline,
  wordmarkSubtitle: 'Mortgage & Finance',
  description: company.description,
  logoUrl: undefined,
  faviconUrl: undefined,
  faviconMime: undefined,
  email: company.email,
  emailSupport: company.emailSupport,
  phone: company.phone,
  phoneAlt: company.phoneAlt,
  fax: company.fax,
  address: { ...company.address },
  maps: { ...company.maps },
  officeHours: [...company.officeHours],
  social: { ...company.social },
  taxId: company.taxId,
  registrationNumber: company.registrationNumber,
  established: company.established,
  copyright: company.copyright,
};

export const defaultNavigation: NavConfig = navigationData;

export const defaultFooter: FooterConfig = footerData;

// ─── API Methods ─────────────────────────────────────────────────────────────

export const GlobalAPI = {
  /**
   * Fetch company contact, address, legal, and brand information.
   */
  async getCompanyInfo(): Promise<APIResponse<CompanyInfo>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchSingle<Record<string, unknown>>('company-info', {
          populate: '*',
        });
        const d = res.data ?? {};

        const logo = d.logo as { url?: string } | null | undefined;
        const favicon = d.favicon as { url?: string; mime?: string } | null | undefined;

        const logoUrl = logo?.url ? getStrapiMediaUrl(logo.url) : undefined;
        const faviconUrl = favicon?.url ? getStrapiMediaUrl(favicon.url) : undefined;
        const faviconMime = (favicon?.mime as string) || undefined;

        const rawAddress = (d.address as Partial<CompanyAddress>) || {};
        const address: CompanyAddress = {
          street: (rawAddress.street as string) || defaultCompanyInfo.address.street,
          city: (rawAddress.city as string) || defaultCompanyInfo.address.city,
          province: (rawAddress.province as string) || defaultCompanyInfo.address.province,
          postalCode:
            (rawAddress.postalCode as string) ?? defaultCompanyInfo.address.postalCode,
          country: (rawAddress.country as string) || defaultCompanyInfo.address.country,
          full: (rawAddress.full as string) || defaultCompanyInfo.address.full,
        };

        const rawMapsEmbedUrl = d.mapsEmbedUrl as string | undefined;
        const rawMapsDirectionsUrl = d.mapsDirectionsUrl as string | undefined;
        const maps = {
          embedUrl: rawMapsEmbedUrl || defaultCompanyInfo.maps.embedUrl,
          directionsUrl: rawMapsDirectionsUrl || defaultCompanyInfo.maps.directionsUrl,
        };

        const rawOfficeHours = d.officeHours as OfficeHour[] | undefined;
        const officeHours: OfficeHour[] =
          Array.isArray(rawOfficeHours) && rawOfficeHours.length > 0
            ? rawOfficeHours
            : defaultCompanyInfo.officeHours;

        const rawSocial = (d.socialLinks as Partial<SocialLinks>) || {};
        const social: SocialLinks = {
          facebook: (rawSocial.facebook as string) || defaultCompanyInfo.social.facebook,
          linkedin: (rawSocial.linkedin as string) || defaultCompanyInfo.social.linkedin,
          instagram: (rawSocial.instagram as string) || defaultCompanyInfo.social.instagram,
          tiktok: (rawSocial.tiktok as string) || defaultCompanyInfo.social.tiktok,
          youtube: (rawSocial.youtube as string) || defaultCompanyInfo.social.youtube,
          x: (rawSocial.x as string) || defaultCompanyInfo.social.x,
        };

        const companyInfo: CompanyInfo = {
          name: (d.name as string) || defaultCompanyInfo.name,
          fullName: (d.fullName as string) || defaultCompanyInfo.fullName,
          tagline: (d.tagline as string) || defaultCompanyInfo.tagline,
          wordmarkSubtitle:
            (d.wordmarkSubtitle as string) || defaultCompanyInfo.wordmarkSubtitle,
          description: (d.description as string) || defaultCompanyInfo.description,
          logoUrl,
          faviconUrl,
          faviconMime,
          email: (d.email as string) || defaultCompanyInfo.email,
          emailSupport: (d.emailSupport as string) || defaultCompanyInfo.emailSupport,
          phone: (d.phone as string) || defaultCompanyInfo.phone,
          phoneAlt: (d.phoneAlt as string) || defaultCompanyInfo.phoneAlt,
          fax: (d.fax as string) ?? defaultCompanyInfo.fax,
          address,
          maps,
          officeHours,
          social,
          taxId: (d.taxId as string) || defaultCompanyInfo.taxId,
          registrationNumber:
            (d.registrationNumber as string) || defaultCompanyInfo.registrationNumber,
          established:
            typeof d.established === 'number'
              ? d.established
              : defaultCompanyInfo.established,
          copyright: (d.copyright as string) || defaultCompanyInfo.copyright,
        };

        return {
          data: companyInfo,
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn(
          '[GlobalAPI.getCompanyInfo] Failed to fetch company info from CMS, falling back to static config:',
          err,
        );
        return {
          data: defaultCompanyInfo,
          success: true,
          timestamp: new Date().toISOString(),
        };
      }
    }

    return {
      data: defaultCompanyInfo,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Fetch site navigation and header CTA config.
   */
  async getNavigation(): Promise<APIResponse<NavConfig>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchSingle<Record<string, unknown>>('navigation');
        const d = res.data ?? {};
        const links =
          Array.isArray(d.links) && d.links.length > 0
            ? (d.links as NavLink[])
            : defaultNavigation.links;
        const cta = {
          label: (d.ctaLabel as string) || defaultNavigation.cta.label,
          href: (d.ctaHref as string) || defaultNavigation.cta.href,
        };

        return {
          data: { links, cta },
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn(
          '[GlobalAPI.getNavigation] Failed to fetch navigation from CMS, falling back to static config:',
          err,
        );
        return {
          data: defaultNavigation,
          success: true,
          timestamp: new Date().toISOString(),
        };
      }
    }

    return {
      data: defaultNavigation,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Fetch site footer columns, certifications, and newsletter config.
   */
  async getFooter(): Promise<APIResponse<FooterConfig>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchSingle<Record<string, unknown>>('footer');
        const d = res.data ?? {};
        const columns =
          Array.isArray(d.columns) && d.columns.length > 0
            ? (d.columns as FooterColumn[])
            : defaultFooter.columns;
        const certifications =
          Array.isArray(d.certifications) && d.certifications.length > 0
            ? (d.certifications as string[])
            : defaultFooter.certifications;
        const newsletterTitle =
          (d.newsletterTitle as string) || defaultFooter.newsletterTitle;
        const newsletterDescription =
          (d.newsletterDescription as string) || defaultFooter.newsletterDescription;

        return {
          data: {
            columns,
            certifications,
            newsletterTitle,
            newsletterDescription,
          },
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn(
          '[GlobalAPI.getFooter] Failed to fetch footer from CMS, falling back to static config:',
          err,
        );
        return {
          data: defaultFooter,
          success: true,
          timestamp: new Date().toISOString(),
        };
      }
    }

    return {
      data: defaultFooter,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
