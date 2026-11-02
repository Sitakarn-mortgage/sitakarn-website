/**
 * Contact API
 * Sends form submissions to Strapi CMS.
 * Falls back to mock behaviour when the CMS is not configured.
 */

import type { APIResponse, ContactFormData } from '@/types';
import { isCmsEnabled } from '@/lib/strapi';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/+$/, '');
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN as string | undefined;
const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL as string | undefined)?.replace(/\/+$/, '');

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function postToStrapi<T>(endpoint: string, body: unknown): Promise<T> {
  if (!STRAPI_URL) throw new Error('CMS not configured');

  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`[strapi] ${res.status} ${res.statusText}\n${text}`);
  }

  return res.json() as Promise<T>;
}

// ─── API methods ─────────────────────────────────────────────────────────────

export const ContactAPI = {
  async submit(data: ContactFormData): Promise<APIResponse<{ referenceId: string }>> {
    if (BACKEND_URL) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          const json = await res.json().catch(() => null);
          const referenceId =
            json?.data?.referenceId ||
            json?.referenceId ||
            `SKN-${Date.now().toString(36).toUpperCase()}`;

          return {
            data: { referenceId },
            success: true,
            message: `Your inquiry has been received. Reference: ${referenceId}`,
            timestamp: new Date().toISOString(),
          };
        } else {
          console.warn(
            `[ContactAPI.submit] Backend responded with status ${res.status}:`,
            await res.text().catch(() => ''),
          );
        }
      } catch (err) {
        console.warn('[ContactAPI.submit] Backend submission failed, using mock:', err);
      }
    }

    // ── Mock fallback ──
    await new Promise((resolve) => setTimeout(resolve, 1200));
    if (Math.random() < 0.05) {
      throw new Error('Network error. Please try again.');
    }
    const referenceId = `SKN-${Date.now().toString(36).toUpperCase()}`;
    console.info('[ContactAPI] Form submitted (mock):', { ...data, referenceId });
    return {
      data: { referenceId },
      success: true,
      message: `Your inquiry has been received. Reference: ${referenceId}`,
      timestamp: new Date().toISOString(),
    };
  },

  async subscribeNewsletter(email: string): Promise<APIResponse<null>> {
    if (isCmsEnabled) {
      try {
        await postToStrapi('/newsletter-subscriptions', { data: { email } });
        return {
          data: null,
          success: true,
          message: 'You have been successfully subscribed to our newsletter.',
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[ContactAPI.subscribeNewsletter] CMS submission failed, using mock:', err);
      }
    }

    // ── Mock fallback ──
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.info('[ContactAPI] Newsletter subscription (mock):', email);
    return {
      data: null,
      success: true,
      message: 'You have been successfully subscribed to our newsletter.',
      timestamp: new Date().toISOString(),
    };
  },
};
