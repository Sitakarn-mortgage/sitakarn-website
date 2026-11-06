/**
 * ServiceCard Component
 * One service as an open list item: a hairline on top, icon, title, summary, link.
 * No box, shadow or chips. Rendered as a <button> when it opens the detail drawer.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { staggerItem } from '@/theme/animations';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import type { Service } from '@/types';

export interface ServiceCardProps {
  service: Service;
  variant?: 'default' | 'compact';
  onSelect?: (service: Service) => void;
  className?: string;
}

export function ServiceCard({ service, variant = 'default', onSelect, className }: ServiceCardProps) {
  const body = (
    <>
      <AppIcon name={service.icon} size={28} weight="duotone" className="text-brick-600" />
      <span className="flex flex-col gap-2">
        <span className="font-display text-lg font-semibold text-navy-700 leading-snug group-hover:text-brick-600 transition-colors">
          {service.title}
        </span>
        <span
          className={cn(
            'text-sm text-slate-600 leading-relaxed',
            variant === 'compact' ? 'line-clamp-2' : 'line-clamp-3'
          )}
        >
          {service.shortDescription}
        </span>
      </span>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brick-600 mt-auto">
        View details
        <AppIcon name="ArrowRight" size={14} weight="bold" />
      </span>
    </>
  );

  const classes = cn(
    'group flex flex-col items-start gap-4 border-t border-slate-300 pt-6 text-left h-full',
    className
  );

  return (
    <motion.div variants={staggerItem} className="h-full">
      {onSelect ? (
        <button type="button" onClick={() => onSelect(service)} className={classes}>
          {body}
        </button>
      ) : (
        <Link to={`/services?service=${service.slug}`} className={classes}>
          {body}
        </Link>
      )}
    </motion.div>
  );
}
