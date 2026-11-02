/**
 * Services API
 * Fetches services data from Strapi CMS.
 * Falls back to static data when the CMS is not configured.
 */

import type { APIResponse, ServiceCategory, Service } from '@/types';
import { servicesData } from '@/data/services';
import { isCmsEnabled, fetchCollection } from '@/lib/strapi';

// ─── Strapi → App type mappers ───────────────────────────────────────────────

function mapService(d: Record<string, unknown>, parentCategoryId?: string | number): Service {
  const cat = d.serviceCategory as Record<string, unknown> | undefined;
  const categoryId =
    (d.categoryId as string) ||
    (typeof parentCategoryId === 'string' ? parentCategoryId : '') ||
    (cat?.slug as string) ||
    (cat?.documentId as string) ||
    '';

  return {
    id: String(d.documentId ?? d.id ?? ''),
    slug: (d.slug as string) ?? '',
    categoryId,
    title: (d.title as string) ?? '',
    shortDescription: (d.shortDescription as string) ?? '',
    fullDescription: (d.fullDescription as string) ?? '',
    icon: (d.icon as string) ?? 'Briefcase',
    features: Array.isArray(d.features) ? d.features as string[] : [],
    targetAudience: Array.isArray(d.targetAudience) ? d.targetAudience as string[] : [],
  };
}

function mapServiceCategory(d: Record<string, unknown>): ServiceCategory {
  const categorySlug = (d.slug as string) || String(d.documentId ?? d.id ?? '');
  const services = d.services as Record<string, unknown>[] | undefined;
  return {
    id: categorySlug,
    title: (d.title as string) ?? '',
    shortDescription: (d.shortDescription as string) ?? '',
    icon: (d.icon as string) ?? 'Folder',
    description: (d.description as string) ?? '',
    services: Array.isArray(services)
      ? [...services]
          .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
          .map((s) => mapService(s, categorySlug))
      : [],
  };
}

// ─── API methods ─────────────────────────────────────────────────────────────

export const ServicesAPI = {
  async getAll(): Promise<APIResponse<ServiceCategory[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('service-categories', {
          populate: {
            services: { populate: '*' },
          },
          sort: 'order:asc',
          pagination: { pageSize: 100 },
        });
        return {
          data: res.data.map(mapServiceCategory),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[ServicesAPI.getAll] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: servicesData,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getByCategory(categoryId: string): Promise<APIResponse<ServiceCategory | null>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('service-categories', {
          filters: { slug: { $eq: categoryId } },
          populate: {
            services: { populate: '*' },
          },
          pagination: { pageSize: 1 },
        });
        const first = res.data[0] ?? null;
        return {
          data: first ? mapServiceCategory(first) : null,
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[ServicesAPI.getByCategory] CMS fetch failed, using fallback:', err);
      }
    }
    const category = servicesData.find((c) => c.id === categoryId) ?? null;
    return {
      data: category,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getBySlug(slug: string): Promise<APIResponse<Service | null>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('services', {
          filters: { slug: { $eq: slug } },
          populate: '*',
          pagination: { pageSize: 1 },
        });
        const first = res.data[0] ?? null;
        return {
          data: first ? mapService(first) : null,
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[ServicesAPI.getBySlug] CMS fetch failed, using fallback:', err);
      }
    }
    let found: Service | null = null;
    for (const category of servicesData) {
      const service = category.services.find((s) => s.slug === slug);
      if (service) {
        found = service;
        break;
      }
    }
    return {
      data: found,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getFeatured(limit = 3): Promise<APIResponse<Service[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('services', {
          filters: { featured: { $eq: true } },
          populate: '*',
          pagination: { pageSize: limit },
          sort: 'order:asc',
        });
        return {
          data: res.data.map(mapService),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[ServicesAPI.getFeatured] CMS fetch failed, using fallback:', err);
      }
    }
    const featured = servicesData.flatMap((c) => c.services).slice(0, limit);
    return {
      data: featured,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
