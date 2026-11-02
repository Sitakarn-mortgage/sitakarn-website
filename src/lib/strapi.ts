/**
 * Strapi Client
 * Thin wrapper around the Strapi v5 REST API.
 * All fetch calls to the CMS flow through this module.
 *
 * Required environment variables (set in Vercel → Settings → Env Vars):
 *   VITE_STRAPI_URL       – e.g. https://cms.sitakarn.com
 *   VITE_STRAPI_API_TOKEN – read-only API token generated in Strapi admin
 */

// ─── Configuration ───────────────────────────────────────────────────────────

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/+$/, '');
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN as string | undefined;

/** Whether a live CMS connection is configured */
export const isCmsEnabled = Boolean(STRAPI_URL);

// ─── Types ───────────────────────────────────────────────────────────────────

/** Strapi v5 single-entry response shape */
export interface StrapiSingleResponse<T> {
  data: T & { id: number; documentId: string };
  meta: Record<string, unknown>;
}

/** Strapi v5 collection response shape */
export interface StrapiCollectionResponse<T> {
  data: Array<T & { id: number; documentId: string }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiQueryParams {
  /** Populate relations – `*` for all, or a specific structure */
  populate?: string | Record<string, unknown>;
  /** Filters object, follows Strapi filter syntax */
  filters?: Record<string, unknown>;
  /** Sort string or array: `'createdAt:desc'` */
  sort?: string | string[];
  /** Pagination */
  pagination?: {
    page?: number;
    pageSize?: number;
    withCount?: boolean;
  };
  /** Field selection */
  fields?: string[];
  /** Publication state */
  status?: 'published' | 'draft';
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Recursively serialise a nested object into Strapi-style bracket-notation
 * query-string params.
 *
 * Example: `{ filters: { featured: { $eq: true } } }`
 * → `filters[featured][$eq]=true`
 */
function serialiseParams(
  obj: Record<string, unknown>,
  prefix = '',
): string[] {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const paramKey = prefix ? `${prefix}[${key}]` : key;

    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (typeof v === 'object' && v !== null) {
          parts.push(...serialiseParams(v as Record<string, unknown>, `${paramKey}[${i}]`));
        } else {
          parts.push(`${paramKey}[${i}]=${encodeURIComponent(String(v))}`);
        }
      });
    } else if (typeof value === 'object') {
      parts.push(...serialiseParams(value as Record<string, unknown>, paramKey));
    } else {
      parts.push(`${paramKey}=${encodeURIComponent(String(value))}`);
    }
  }

  return parts;
}

function buildQueryString(params?: StrapiQueryParams): string {
  if (!params) return '';
  const parts = serialiseParams(params as unknown as Record<string, unknown>);
  return parts.length ? `?${parts.join('&')}` : '';
}

// ─── Core Fetch ──────────────────────────────────────────────────────────────

async function strapiFetch<T>(
  endpoint: string,
  params?: StrapiQueryParams,
): Promise<T> {
  if (!STRAPI_URL) {
    throw new Error('[strapi] VITE_STRAPI_URL is not set. CMS requests are disabled.');
  }

  const url = `${STRAPI_URL}/api${endpoint}${buildQueryString(params)}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(url, { headers });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(
      `[strapi] ${res.status} ${res.statusText} – ${endpoint}\n${body}`,
    );
  }

  return res.json() as Promise<T>;
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Fetch a **collection** of entries (e.g. `/api/testimonials`).
 */
export async function fetchCollection<T>(
  pluralApiId: string,
  params?: StrapiQueryParams,
): Promise<StrapiCollectionResponse<T>> {
  return strapiFetch<StrapiCollectionResponse<T>>(`/${pluralApiId}`, params);
}

/**
 * Fetch a **single-type** entry (e.g. `/api/homepage`).
 */
export async function fetchSingle<T>(
  singularApiId: string,
  params?: StrapiQueryParams,
): Promise<StrapiSingleResponse<T>> {
  return strapiFetch<StrapiSingleResponse<T>>(`/${singularApiId}`, params);
}

/**
 * Fetch a single entry by its documentId from a collection.
 */
export async function fetchOne<T>(
  pluralApiId: string,
  documentId: string,
  params?: StrapiQueryParams,
): Promise<StrapiSingleResponse<T>> {
  return strapiFetch<StrapiSingleResponse<T>>(`/${pluralApiId}/${documentId}`, params);
}

// ─── Media Helpers ───────────────────────────────────────────────────────────

/**
 * Resolve a Strapi media `url` to an absolute URL.
 * Local uploads come back as `/uploads/...`, hosted uploads may already be absolute.
 */
export function getStrapiMediaUrl(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}
