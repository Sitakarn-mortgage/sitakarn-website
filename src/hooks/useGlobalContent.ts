/**
 * Global Content Hooks
 * Provides reactive access to company info, navigation, and footer settings.
 * Uses TanStack Query with static placeholderData for zero-flicker frame-1 rendering.
 */

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { CompanyInfo, FooterConfig, NavConfig } from '@/types';
import {
  GlobalAPI,
  defaultCompanyInfo,
  defaultFooter,
  defaultNavigation,
} from '@/api/global';

/**
 * Access company information, contact details, social links, and brand assets.
 * Automatically synchronizes the document favicon when configured in Strapi CMS.
 */
export function useCompanyInfo(): CompanyInfo {
  const { data } = useQuery({
    queryKey: ['companyInfo'],
    queryFn: GlobalAPI.getCompanyInfo,
    placeholderData: {
      data: defaultCompanyInfo,
      success: true,
      timestamp: '',
    },
  });

  const info = data?.data ?? defaultCompanyInfo;

  useEffect(() => {
    if (info.faviconUrl && info.faviconUrl.trim() !== '') {
      let el = document.querySelector<HTMLLinkElement>('link[rel="icon"], link[rel*="icon"]');
      if (!el) {
        el = document.createElement('link');
        document.head.appendChild(el);
      }
      el.rel = 'icon';
      el.href = info.faviconUrl;
      el.type = info.faviconMime || 'image/png';
    }
  }, [info.faviconUrl, info.faviconMime]);

  return info;
}

/**
 * Access navigation links and the primary header call-to-action button.
 */
export function useNavigation(): NavConfig {
  const { data } = useQuery({
    queryKey: ['navigation'],
    queryFn: GlobalAPI.getNavigation,
    placeholderData: {
      data: defaultNavigation,
      success: true,
      timestamp: '',
    },
  });

  return data?.data ?? defaultNavigation;
}

/**
 * Access footer columns, legal certifications, and newsletter CTA text.
 */
export function useFooter(): FooterConfig {
  const { data } = useQuery({
    queryKey: ['footer'],
    queryFn: GlobalAPI.getFooter,
    placeholderData: {
      data: defaultFooter,
      success: true,
      timestamp: '',
    },
  });

  return data?.data ?? defaultFooter;
}
