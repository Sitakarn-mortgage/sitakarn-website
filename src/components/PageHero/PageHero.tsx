/**
 * PageHero Component
 * Editorial full-bleed background-photo hero header used across inner pages.
 * Adheres strictly to brand rules: Deep Navy + Brick Red overlay, white Playfair Display
 * headings, JetBrains Mono eyebrow with signature double-rule (never gold on dark navy).
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { Container } from '@/components/Container/Container';
import { Divider } from '@/components/Divider/Divider';
import { fadeUp, staggerContainer } from '@/theme/animations';

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  align?: 'left' | 'center';
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  imageUrl,
  imageAlt = '',
  align = 'left',
  children,
  className,
}: PageHeroProps) {
  const isCentered = align === 'center';

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-navy-800 pt-24 pb-20 md:pt-28 md:pb-24 border-b border-navy-900/40',
        className,
      )}
    >
      {/* Background Photograph */}
      {imageUrl && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover object-center scale-[1.01]"
            fetchPriority="high"
          />
        </div>
      )}

      {/* Flat navy overlay for text legibility over the photograph */}
      <div className="absolute inset-0 z-0 bg-navy-900/80" aria-hidden="true" />
      {/* Top brick rule */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brick-600 z-10" aria-hidden="true" />

      <Container className="relative z-10">
        <div className={cn('max-w-3xl', isCentered && 'mx-auto text-center')}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className={cn('flex flex-col gap-6', isCentered && 'items-center')}
          >
            {eyebrow && (
              <motion.div
                variants={fadeUp}
                className={cn('flex items-center gap-3', isCentered && 'justify-center')}
              >
                <Divider theme="dark" />
                <span className="eyebrow text-brick-200">{eyebrow}</span>
                {isCentered && <Divider theme="dark" />}
              </motion.div>
            )}

            <motion.h1
              variants={fadeUp}
              className="font-display font-bold text-4xl md:text-5xl text-white leading-tight drop-shadow-sm"
            >
              {title}
            </motion.h1>

            {description && (
              <motion.p
                variants={fadeUp}
                className="text-lg text-white/75 leading-relaxed"
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        </div>

        {children}
      </Container>
    </section>
  );
}

