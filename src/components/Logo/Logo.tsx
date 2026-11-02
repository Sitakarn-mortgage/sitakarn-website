/**
 * Logo Component
 * Uses the official SK Sitakarn logo image from assets.
 * Falls back to a styled text mark if image fails to load.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { useCompanyInfo } from '@/hooks/useGlobalContent';
import logoImg from '@/assets/logo.png';

type LogoTheme = 'light' | 'dark';
type LogoSize  = 'sm' | 'md' | 'lg';

interface LogoProps {
  theme?: LogoTheme;
  size?: LogoSize;
  showWordmark?: boolean;
  className?: string;
  linkTo?: string;
}

const sizeMap: Record<LogoSize, { img: string; text: string; sub: string }> = {
  sm: { img: 'h-8 w-8',   text: 'text-base',  sub: 'text-[9px]'  },
  md: { img: 'h-10 w-10', text: 'text-lg',    sub: 'text-[10px]' },
  lg: { img: 'h-14 w-14', text: 'text-2xl',   sub: 'text-xs'     },
};

export function Logo({
  theme = 'light',
  size = 'md',
  showWordmark = true,
  className,
  linkTo = '/',
}: LogoProps) {
  const companyInfo = useCompanyInfo();
  const isDark = theme === 'dark';
  const sizes  = sizeMap[size];

  const logoContent = (
    <div className={cn('flex items-center gap-2.5', className)}>
      {/* Official logo image */}
      <img
        src={companyInfo.logoUrl || logoImg}
        alt={`${companyInfo.name} logo`}
        className={cn('object-contain flex-shrink-0', sizes.img)}
        aria-hidden="true"
      />

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none gap-0.5">
          <span
            className={cn(
              'font-display font-bold tracking-tight',
              sizes.text,
              isDark ? 'text-white' : 'text-navy-700'
            )}
          >
            {companyInfo.name}
          </span>
          <span
            className={cn(
              'font-mono uppercase tracking-widest',
              sizes.sub,
              isDark ? 'text-white/50' : 'text-gold-600'
            )}
          >
            {companyInfo.wordmarkSubtitle || 'Mortgage & Finance'}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <Link to={linkTo} aria-label={`${companyInfo.name} — Go to homepage`}>
      {logoContent}
    </Link>
  );
}
