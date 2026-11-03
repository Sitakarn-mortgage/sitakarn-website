/**
 * FeatureCard Component
 * Icon + title + text. No box, no border, no hover effect (it is not interactive).
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import { staggerItem } from '@/theme/animations';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
}

export function FeatureCard({ title, description, icon, className }: FeatureCardProps) {
  return (
    <motion.div variants={staggerItem} className={cn('flex flex-col gap-3', className)}>
      <AppIcon name={icon} size={32} weight="duotone" className="text-brick-600" />
      <h3 className="font-display font-semibold text-lg text-navy-700">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
