/**
 * TestimonialCard Component
 * Pull-quote magazine style — not a generic star-rating card.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { staggerItem } from '@/theme/animations';
import type { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: 'default' | 'featured';
  className?: string;
}



export function TestimonialCard({ testimonial, variant = 'default', className }: TestimonialCardProps) {
  return (
    <motion.blockquote
      variants={staggerItem}
      className={cn(
        'flex flex-col gap-5 p-7',
        'border-l-2 border-brick-600',
        'bg-white',
        variant === 'featured' && 'border-l-4 border-gold-500',
        className
      )}
    >
      {/* Quote mark — editorial style */}
      <div
        className="font-display text-6xl text-brick-100 leading-none select-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Quote text */}
      <p className={cn(
        'text-slate-600 leading-relaxed italic font-display',
        variant === 'featured' ? 'text-base' : 'text-sm'
      )}>
        {testimonial.quote}
      </p>

      {/* Attribution */}
      <footer className="flex flex-col gap-1 mt-auto">
        <cite className="not-italic">
          <span className="font-semibold text-sm text-navy-700 block">{testimonial.authorName}</span>
          <span className="text-xs text-slate-500 block">{testimonial.authorTitle}</span>
        </cite>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-px flex-1 bg-slate-100" aria-hidden="true" />
          <span className="text-xs text-gold-600 font-mono">{testimonial.organization}</span>
        </div>
      </footer>
    </motion.blockquote>
  );
}
