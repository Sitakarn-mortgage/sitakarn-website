/**
 * SocialIcons Component
 * Bare icon links — no bordered boxes.
 */

import React from 'react';
import { cn } from '@/utils/cn';
import { useCompanyInfo } from '@/hooks/useGlobalContent';
import { AppIcon } from '@/components/AppIcon/AppIcon';

type SocialIconsTheme = 'light' | 'dark';
type SocialIconsSize = 'sm' | 'md' | 'lg';

interface SocialIconsProps {
  theme?: SocialIconsTheme;
  size?: SocialIconsSize;
  className?: string;
}

const icons = [
  { key: 'facebook', iconName: 'FacebookLogo', label: 'Facebook' },
  { key: 'linkedin', iconName: 'LinkedinLogo', label: 'LinkedIn' },
  { key: 'instagram', iconName: 'InstagramLogo', label: 'Instagram' },
  { key: 'tiktok', iconName: 'TiktokLogo', label: 'TikTok' },
  { key: 'youtube', iconName: 'YoutubeLogo', label: 'YouTube' },
  { key: 'x', iconName: 'XLogo', label: 'X (Twitter)' },
] as const;

const iconSizes: Record<SocialIconsSize, number> = { sm: 18, md: 20, lg: 24 };

export function SocialIcons({ theme = 'dark', size = 'md', className }: SocialIconsProps) {
  const companyInfo = useCompanyInfo();
  const isDark = theme === 'dark';

  return (
    <div className={cn('flex items-center', className)} aria-label="Social media links">
      {icons.map(({ key, iconName, label }) => {
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
              'size-11 flex items-center justify-center transition-colors duration-150',
              isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-brick-600'
            )}
          >
            <AppIcon name={iconName} size={iconSizes[size]} weight="regular" />
          </a>
        );
      })}
    </div>
  );
}
