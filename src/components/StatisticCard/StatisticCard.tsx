/**
 * StatisticCard Component
 * Number + label + description. Bare icon, no chip, no boxed cell.
 * Dark theme uses white / brick-200 only (never gold on navy).
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import { staggerItem } from '@/theme/animations';
import type { Statistic } from '@/types';

interface StatisticCardProps {
  stat: Statistic;
  theme?: 'light' | 'dark';
  className?: string;
}

export function StatisticCard({ stat, theme = 'light', className }: StatisticCardProps) {
  const isDark = theme === 'dark';

  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        'flex flex-col gap-2 pt-5 border-t',
        isDark ? 'border-white/20' : 'border-slate-200',
        className
      )}
    >
      <span
        className={cn(
          'font-display font-bold leading-none tabular-nums text-4xl sm:text-5xl',
          isDark ? 'text-white' : 'text-navy-700'
        )}
        aria-label={`${stat.value} ${stat.label}`}
      >
        {stat.value}
      </span>
      <span className="flex items-center gap-2 mt-1">
        {stat.icon && (
          <AppIcon
            name={stat.icon}
            size={18}
            weight="regular"
            className={isDark ? 'text-brick-200' : 'text-brick-600'}
          />
        )}
        <span className={cn('text-base font-medium', isDark ? 'text-white' : 'text-navy-700')}>
          {stat.label}
        </span>
      </span>
      {stat.description && (
        <p className={cn('text-sm leading-relaxed', isDark ? 'text-white/65' : 'text-slate-600')}>
          {stat.description}
        </p>
      )}
    </motion.div>
  );
}
