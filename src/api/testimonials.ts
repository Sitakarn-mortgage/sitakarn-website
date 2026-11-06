/**
 * Testimonials API
 * Fetches testimonial data from Strapi CMS.
 * Falls back to static data when the CMS is not configured.
 */

import type { APIResponse, Testimonial } from '@/types';
import { testimonialsData } from '@/data/testimonials';
import { isCmsEnabled, fetchCollection } from '@/lib/strapi';

// ─── Strapi → App type mapper ────────────────────────────────────────────────

function mapTestimonial(d: Record<string, unknown>): Testimonial {
  return {
    id: String(d.documentId ?? d.id ?? ''),
    quote: (d.quote as string) ?? '',
    authorName: (d.authorName as string) ?? '',
    authorTitle: (d.authorTitle as string) ?? '',
    organization: (d.organization as string) ?? '',
    organizationType: (d.organizationType as Testimonial['organizationType']) ?? 'other',
    rating: (d.rating as number) ?? 5,
    featured: (d.featured as boolean) ?? false,
  };
}

// ─── API methods ─────────────────────────────────────────────────────────────

export const TestimonialsAPI = {
  async getAll(): Promise<APIResponse<Testimonial[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('testimonials', {
          sort: 'createdAt:desc',
          pagination: { pageSize: 100 },
        });
        return {
          data: res.data.map(mapTestimonial),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[TestimonialsAPI.getAll] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: testimonialsData,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getFeatured(): Promise<APIResponse<Testimonial[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('testimonials', {
          filters: { featured: { $eq: true } },
          sort: 'createdAt:desc',
          pagination: { pageSize: 100 },
        });
        return {
          data: res.data.map(mapTestimonial),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[TestimonialsAPI.getFeatured] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: testimonialsData.filter((t) => t.featured),
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
