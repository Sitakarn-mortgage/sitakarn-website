/**
 * Badge Component
 * Small label for categorization and status indicators.
 */

import React from 'react';
import { cn } from '@/utils/cn';

type BadgeVariant = 'navy' | 'teal' | 'gold' | 'neutral' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  navy:    'bg-navy-700 text-white',
  teal:    'bg-brick-600 text-white', // name preserved for API compatibility; renders brick
  gold:    'bg-gold-100 text-gold-700',
  neutral: 'bg-slate-100 text-slate-600',
  outline: 'border border-brick-200 text-brick-600 bg-transparent',
};

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
