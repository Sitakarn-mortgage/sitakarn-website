/**
 * useSEO Hook
 * Sets document title and meta tags for SEO on each page.
 */

import { useEffect } from 'react';
import type { SEOProps } from '@/types';
import { useCompanyInfo } from '@/hooks/useGlobalContent';

export function useSEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  noIndex = false,
}: SEOProps): void {
  const companyInfo = useCompanyInfo();

  useEffect(() => {
    // Title
    const fullTitle = `${title} | ${companyInfo.name}`;
    document.title = fullTitle;

    // Helper to upsert a <meta> tag
    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        const attrName = selector.includes('property') ? 'property' : 'name';
        const attrValue = selector.match(/["']([^"']+)["']/)?.[1] ?? '';
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[property="og:site_name"]', companyInfo.fullName);

    if (ogImage) {
      setMeta('meta[property="og:image"]', ogImage);
    }

    if (canonical) {
      setLink('canonical', canonical);
      setMeta('meta[property="og:url"]', canonical);
    }

    if (noIndex) {
      setMeta('meta[name="robots"]', 'noindex, nofollow');
    } else {
      setMeta('meta[name="robots"]', 'index, follow');
    }

    return () => {
      document.title = companyInfo.fullName;
    };
  }, [title, description, canonical, ogImage, ogType, noIndex, companyInfo.name, companyInfo.fullName]);
}
