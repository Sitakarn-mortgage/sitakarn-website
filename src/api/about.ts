/**
 * About Page API
 * Fetches About page content from Strapi CMS.
 * Falls back to static data when the CMS is not configured.
 */

import type { APIResponse } from '@/types';
import {
  aboutHero,
  aboutStory,
  coreValues,
  aboutCertifications,
  type CoreValue,
} from '@/data/about';
import { images } from '@/assets/images';
import { isCmsEnabled, fetchSingle, getStrapiMediaUrl } from '@/lib/strapi';

// ─── Domain types ─────────────────────────────────────────────────────────────

export interface AboutHero {
  eyebrow: string;
  headlinePrefix: string;
  subheadline: string;
}

export interface AboutStory {
  title: string;
  paragraphs: string[];
}

export interface RealEstateHighlight {
  label: string;
  icon: string;
  desc: string;
}

export interface AboutCertifications {
  eyebrow: string;
  title: string;
  description: string;
}

export interface AboutPageData {
  hero: AboutHero;
  story: AboutStory;
  coreValues: CoreValue[];
  realEstate: {
    eyebrow: string;
    headline: string;
    body1: string;
    body2: string;
    highlights: RealEstateHighlight[];
  };
  certifications: AboutCertifications;
  images: {
    heroImageUrl: string;
    officeImageUrl: string;
    meetingImageUrl: string;
    teamImageUrl: string;
    communityImageUrl: string;
  };
}

// ─── Default real-estate section (stays static unless CMS overrides) ──────────

const defaultRealEstateHighlights: RealEstateHighlight[] = [
  { label: 'Verified Property Listings', icon: 'Home', desc: 'Every property reviewed before being promoted to buyers' },
  { label: 'AI Buyer–Property Matching', icon: 'GitMerge', desc: 'Smart matching engine connects requirements to available properties' },
  { label: 'AML/CFT Compliant', icon: 'ShieldCheck', desc: 'Formal KYC, source-of-funds review, and Banking Channel First policy' },
  { label: '20-Step Transaction Process', icon: 'ClipboardList', desc: 'From seller registration to title transfer — fully documented' },
  { label: 'SPIN Property Database', icon: 'Database', desc: 'Centralized, technology-enabled verified property database' },
  { label: 'Professional Partner Network', icon: 'Handshake', desc: 'Lawyers, valuers, surveyors, banks, and government liaisons' },
];

const defaultRealEstate = {
  eyebrow: 'Real Estate Brokerage',
  headline: "Nepal's Professional Property Transaction Partner",
  body1:
    'Sitakarn Mortgage Pvt. Ltd. operates as a professional real estate intermediary connecting property owners with genuine buyers through transparent, ethically managed brokerage services. Our structured 20-step transaction process covers everything from seller registration and KYC to government title transfer and commission settlement.',
  body2:
    'Every listed property receives a unique Sitakarn Property Identification Number (SPIN) and is classified under our due diligence framework — Category A (Verified), Category B (Verification Pending), or Category C (Restricted/Rejected) — ensuring buyers are always protected by our "No Clear Title – No Transaction Recommendation" principle.',
  highlights: defaultRealEstateHighlights,
};

// ─── Default About Page Data ──────────────────────────────────────────────────

export const defaultAboutPageData: AboutPageData = {
  hero: aboutHero,
  story: aboutStory,
  coreValues,
  realEstate: defaultRealEstate,
  certifications: aboutCertifications,
  images: {
    heroImageUrl: images.hero.about,
    officeImageUrl: images.about.office,
    meetingImageUrl: images.about.meeting,
    teamImageUrl: images.about.team,
    communityImageUrl: images.about.community,
  },
};

// ─── Strapi → App type mapper ────────────────────────────────────────────────

function mapAboutPage(d: Record<string, unknown>): AboutPageData {
  const storyParagraphs = Array.isArray(d.storyParagraphs)
    ? (d.storyParagraphs as string[])
    : defaultAboutPageData.story.paragraphs;

  const coreValuesRaw = Array.isArray(d.coreValues)
    ? (d.coreValues as CoreValue[])
    : defaultAboutPageData.coreValues;

  const reHighlights = Array.isArray(d.realEstateHighlights)
    ? (d.realEstateHighlights as RealEstateHighlight[])
    : defaultRealEstateHighlights;

  const heroMedia = d.heroImage as { url?: string } | undefined;
  const officeMedia = d.officeImage as { url?: string } | undefined;
  const meetingMedia = d.meetingImage as { url?: string } | undefined;
  const teamMedia = d.teamImage as { url?: string } | undefined;
  const communityMedia = d.communityImage as { url?: string } | undefined;

  return {
    hero: {
      eyebrow: (d.heroEyebrow as string) ?? defaultAboutPageData.hero.eyebrow,
      headlinePrefix: (d.heroHeadlinePrefix as string) ?? defaultAboutPageData.hero.headlinePrefix,
      subheadline: (d.heroSubheadline as string) ?? defaultAboutPageData.hero.subheadline,
    },
    story: {
      title: (d.storyTitle as string) ?? defaultAboutPageData.story.title,
      paragraphs: storyParagraphs,
    },
    coreValues: coreValuesRaw,
    realEstate: {
      eyebrow: (d.realEstateSectionEyebrow as string) ?? defaultAboutPageData.realEstate.eyebrow,
      headline: (d.realEstateSectionHeadline as string) ?? defaultAboutPageData.realEstate.headline,
      body1: (d.realEstateSectionBody1 as string) ?? defaultAboutPageData.realEstate.body1,
      body2: (d.realEstateSectionBody2 as string) ?? defaultAboutPageData.realEstate.body2,
      highlights: reHighlights,
    },
    certifications: {
      eyebrow: (d.certificationsEyebrow as string) ?? defaultAboutPageData.certifications.eyebrow,
      title: (d.certificationsTitle as string) ?? defaultAboutPageData.certifications.title,
      description: (d.certificationsDescription as string) ?? defaultAboutPageData.certifications.description,
    },
    images: {
      heroImageUrl: heroMedia?.url
        ? getStrapiMediaUrl(heroMedia.url)
        : defaultAboutPageData.images.heroImageUrl,
      officeImageUrl: officeMedia?.url
        ? getStrapiMediaUrl(officeMedia.url)
        : defaultAboutPageData.images.officeImageUrl,
      meetingImageUrl: meetingMedia?.url
        ? getStrapiMediaUrl(meetingMedia.url)
        : defaultAboutPageData.images.meetingImageUrl,
      teamImageUrl: teamMedia?.url
        ? getStrapiMediaUrl(teamMedia.url)
        : defaultAboutPageData.images.teamImageUrl,
      communityImageUrl: communityMedia?.url
        ? getStrapiMediaUrl(communityMedia.url)
        : defaultAboutPageData.images.communityImageUrl,
    },
  };
}

// ─── API methods ─────────────────────────────────────────────────────────────

export const AboutAPI = {
  async getPage(): Promise<APIResponse<AboutPageData>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchSingle<Record<string, unknown>>('about-page', {
          populate: '*',
        });
        return {
          data: mapAboutPage(res.data),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[AboutAPI.getPage] CMS fetch failed, using fallback:', err);
      }
    }

    // ── Static fallback ──
    return {
      data: defaultAboutPageData,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
