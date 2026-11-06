/**
 * ProcessStep Component
 * Numbered step (this content IS a sequence) with a connector line on all screen sizes.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import { fadeUp } from '@/theme/animations';
import type { ProcessStep as ProcessStepType } from '@/types';

interface ProcessStepProps {
  step: ProcessStepType;
  isLast?: boolean;
  className?: string;
}

export function ProcessStep({ step, isLast = false, className }: ProcessStepProps) {
  return (
    <motion.div variants={fadeUp} className={cn('relative flex gap-5 md:gap-6', className)}>
      {!isLast && (
        <div
          className="absolute left-5 top-12 bottom-0 w-px bg-slate-200"
          aria-hidden="true"
        />
      )}

      <div className="shrink-0 size-10 rounded-full bg-navy-700 text-white flex items-center justify-center font-mono font-semibold text-sm z-10">
        {step.step}
      </div>

      <div className={cn('flex-1 pt-1.5', !isLast && 'pb-10')}>
        <div className="flex items-center gap-2.5 mb-2">
          <AppIcon name={step.icon} size={22} weight="duotone" className="text-brick-600" />
          <h3 className="font-display font-semibold text-xl text-navy-700">{step.title}</h3>
        </div>
        <p className="text-slate-600 leading-relaxed max-w-prose">{step.description}</p>
      </div>
    </motion.div>
  );
}
