/**
 * Blog / Insights API
 * Fetches blog posts from Strapi CMS.
 * Falls back to static data when the CMS is not configured.
 */

import type { APIResponse, BlogPost, BlogCategory } from '@/types';
import { blogData } from '@/data/blog';
import { isCmsEnabled, fetchCollection, getStrapiMediaUrl } from '@/lib/strapi';

// ─── Strapi → App type mapper ────────────────────────────────────────────────

function mapBlogPost(d: Record<string, unknown>): BlogPost {
  // Handle Strapi media relation for coverImage
  const coverImage = d.coverImage as Record<string, unknown> | undefined;
  const imageUrl = coverImage?.url
    ? getStrapiMediaUrl(coverImage.url as string)
    : (d.imageUrl as string) ?? '';

  // Prefer publishDate for historical dates (e.g. 2024-11-15) before publishedAt and createdAt
  const publishedAt =
    (d.publishDate as string) ??
    (d.publishedAt as string) ??
    (d.createdAt as string) ??
    new Date().toISOString();

  return {
    id: String(d.documentId ?? d.id ?? ''),
    slug: (d.slug as string) ?? '',
    title: (d.title as string) ?? '',
    excerpt: (d.excerpt as string) ?? '',
    body: (d.body as string) ?? undefined,
    category: (d.category as BlogCategory) ?? 'industry-news',
    categoryLabel: (d.categoryLabel as string) ?? '',
    author: (d.author as string) ?? '',
    publishedAt: publishedAt.split('T')[0], // ISO date only
    readingTime: (d.readingTime as number) ?? 5,
    imageUrl,
    featured: (d.featured as boolean) ?? false,
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
  };
}

// ─── API methods ─────────────────────────────────────────────────────────────

export const BlogAPI = {
  async getAll(): Promise<APIResponse<BlogPost[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('blog-posts', {
          populate: { coverImage: { fields: ['url', 'alternativeText'] } },
          sort: ['publishDate:desc', 'publishedAt:desc'],
          pagination: { pageSize: 100 },
          status: 'published',
        });
        return {
          data: res.data.map(mapBlogPost),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[BlogAPI.getAll] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: blogData,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getFeatured(limit = 3): Promise<APIResponse<BlogPost[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('blog-posts', {
          filters: { featured: { $eq: true } },
          populate: { coverImage: { fields: ['url', 'alternativeText'] } },
          sort: ['publishDate:desc', 'publishedAt:desc'],
          pagination: { pageSize: limit },
          status: 'published',
        });
        return {
          data: res.data.map(mapBlogPost),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[BlogAPI.getFeatured] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: blogData.filter((p) => p.featured).slice(0, limit),
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getByCategory(category: BlogCategory): Promise<APIResponse<BlogPost[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('blog-posts', {
          filters: { category: { $eq: category } },
          populate: { coverImage: { fields: ['url', 'alternativeText'] } },
          sort: ['publishDate:desc', 'publishedAt:desc'],
          pagination: { pageSize: 100 },
          status: 'published',
        });
        return {
          data: res.data.map(mapBlogPost),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[BlogAPI.getByCategory] CMS fetch failed, using fallback:', err);
      }
    }
    return {
      data: blogData.filter((p) => p.category === category),
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getBySlug(slug: string): Promise<APIResponse<BlogPost | null>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('blog-posts', {
          filters: { slug: { $eq: slug } },
          populate: { coverImage: { fields: ['url', 'alternativeText'] } },
          pagination: { pageSize: 1 },
          status: 'published',
        });
        const first = res.data[0] ?? null;
        return {
          data: first ? mapBlogPost(first) : null,
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[BlogAPI.getBySlug] CMS fetch failed, using fallback:', err);
      }
    }
    const found = blogData.find((p) => p.slug === slug) ?? null;
    return {
      data: found,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
