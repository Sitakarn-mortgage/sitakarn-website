/**
 * Partners API
 * Fetches institutional partners and certification bodies from Strapi CMS.
 * Falls back to static partnersData when CMS is unconfigured or returns no data.
 */

import type { APIResponse, Partner } from '@/types';
import { partnersData } from '@/data/partners';
import { isCmsEnabled, fetchCollection, getStrapiMediaUrl } from '@/lib/strapi';

// ─── Strapi → App Type Mapper ─────────────────────────────────────────────────

function mapPartner(d: Record<string, unknown>): Partner {
  const logo = d.logo as { url?: string } | null | undefined;
  return {
    id: String(d.documentId ?? d.id ?? ''),
    name: (d.name as string) ?? '',
    shortCode: (d.shortCode as string) || undefined,
    logoUrl: logo?.url ? getStrapiMediaUrl(logo.url) : '',
    website: (d.website as string) || undefined,
    type: ((d.partnerType as Partner['type']) ?? 'partner'),
  };
}

// ─── API Methods ─────────────────────────────────────────────────────────────

export const PartnersAPI = {
  async getAll(): Promise<APIResponse<Partner[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('partners', {
          populate: 'logo',
          sort: 'order:asc',
          pagination: { pageSize: 100 },
        });

        if (res.data && res.data.length > 0) {
          return {
            data: res.data.map(mapPartner),
            success: true,
            timestamp: new Date().toISOString(),
          };
        }
      } catch (err) {
        console.warn('[PartnersAPI.getAll] CMS fetch failed, using fallback:', err);
      }
    }

    return {
      data: partnersData,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
