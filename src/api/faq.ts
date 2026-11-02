/**
 * FAQ API
 * Fetches FAQ data from Strapi CMS.
 * Falls back to static data when the CMS is not configured.
 */

import type { APIResponse, FAQItem } from '@/types';
import { faqData } from '@/data/faq';
import { isCmsEnabled, fetchCollection } from '@/lib/strapi';

// ─── Strapi → App type mapper ────────────────────────────────────────────────

function mapFAQ(d: Record<string, unknown>): FAQItem {
  return {
    id: String(d.documentId ?? d.id ?? ''),
    question: (d.question as string) ?? '',
    answer: (d.answer as string) ?? '',
    category: (d.category as string) ?? '',
  };
}

// ─── API methods ─────────────────────────────────────────────────────────────

export const FAQAPI = {
  async getAll(): Promise<APIResponse<FAQItem[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('faqs', {
          sort: 'order:asc',
          pagination: { pageSize: 100 },
        });
        return {
          data: res.data.map(mapFAQ),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[FAQAPI.getAll] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: faqData,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getByCategory(category: string): Promise<APIResponse<FAQItem[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('faqs', {
          filters: { category: { $eq: category } },
          sort: 'order:asc',
          pagination: { pageSize: 100 },
        });
        return {
          data: res.data.map(mapFAQ),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[FAQAPI.getByCategory] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: faqData.filter((f) => f.category === category),
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
