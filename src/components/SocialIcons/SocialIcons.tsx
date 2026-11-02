/**
 * SocialIcons Component
 * Renders social media icon links from config.
 */

import React from 'react';
import { cn } from '@/utils/cn';
import { useCompanyInfo } from '@/hooks/useGlobalContent';

type SocialIconsTheme = 'light' | 'dark';
type SocialIconsSize = 'sm' | 'md' | 'lg';

interface SocialIconsProps {
  theme?: SocialIconsTheme;
  size?: SocialIconsSize;
  className?: string;
}

// Raw SVG icons since brand icons were removed from lucide-react
const SvgFacebook = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const SvgLinkedin = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const SvgInstagram = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const SvgYoutube = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);
const SvgTwitter = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
const SvgTikTok = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
);

const icons = [
  { key: 'facebook', icon: SvgFacebook, label: 'Facebook' },
  { key: 'linkedin', icon: SvgLinkedin, label: 'LinkedIn' },
  { key: 'instagram', icon: SvgInstagram, label: 'Instagram' },
  { key: 'tiktok', icon: SvgTikTok, label: 'TikTok' },
  { key: 'youtube', icon: SvgYoutube, label: 'YouTube' },
  { key: 'x', icon: SvgTwitter, label: 'X (Twitter)' },
] as const;

const iconSizes: Record<SocialIconsSize, number> = { sm: 14, md: 16, lg: 20 };

const buttonSizes: Record<SocialIconsSize, string> = {
  sm: 'w-7 h-7',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

export function SocialIcons({ theme = 'dark', size = 'md', className }: SocialIconsProps) {
  const companyInfo = useCompanyInfo();
  const isDark = theme === 'dark';
  const px = iconSizes[size];

  return (
    <div className={cn('flex items-center gap-2', className)} aria-label="Social media links">
      {icons.map(({ key, icon: Icon, label }) => {
        const href = companyInfo.social[key as keyof typeof companyInfo.social];
        if (!href) return null;
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit us on ${label}`}
            className={cn(
              'rounded flex items-center justify-center',
              'transition-colors duration-150',
              buttonSizes[size],
              isDark
                ? 'text-white/50 hover:text-white hover:bg-white/10'
                : 'text-slate-500 hover:text-brick-600 hover:bg-brick-50'
            )}
          >
            <Icon size={px} />
          </a>
        );
      })}
    </div>
  );
}
