/**
 * TestimonialCard Component
 * Pull-quote with a brick rule on the left. No box, no shadow.
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
      className={cn('flex flex-col gap-5 pl-6 border-l-2 border-brick-600', className)}
    >
      <p
        className={cn(
          'text-slate-700 leading-relaxed italic font-display',
          variant === 'featured' ? 'text-lg' : 'text-base'
        )}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <footer className="mt-auto">
        <cite className="not-italic">
          <span className="font-semibold text-sm text-navy-700 block">{testimonial.authorName}</span>
          <span className="text-sm text-slate-500 block">
            {testimonial.authorTitle}, {testimonial.organization}
          </span>
        </cite>
      </footer>
    </motion.blockquote>
  );
}
