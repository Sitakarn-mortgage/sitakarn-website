/**
 * Services Page
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { ServicesAPI } from '@/api/services';
import { PagesAPI, defaultServicesPageData } from '@/api/pages';
import { PageHero } from '@/components/PageHero/PageHero';
import { Container } from '@/components/Container/Container';
import { SectionWrapper } from '@/components/SectionWrapper/SectionWrapper';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { ServiceCard } from '@/components/ServiceCard/ServiceCard';
import { fadeUp, staggerContainer } from '@/theme/animations';
import type { ServiceCategory } from '@/types';

/** Icon background colours cycling through the 4 pillars */
const PILLAR_ACCENTS = [
  { bg: 'bg-brick-50',  border: 'border-brick-200',  icon: 'text-brick-600',  num: 'text-brick-400'  },
  { bg: 'bg-navy-50',   border: 'border-navy-200',   icon: 'text-navy-600',   num: 'text-navy-400'   },
  { bg: 'bg-gold-50',   border: 'border-gold-300',   icon: 'text-gold-600',   num: 'text-gold-500'   },
  { bg: 'bg-slate-50',  border: 'border-slate-200',  icon: 'text-slate-600',  num: 'text-slate-400'  },
];

export function Services() {
  const { data: pageRes } = useQuery({
    queryKey: ['servicesPage'],
    queryFn: PagesAPI.getServicesPage,
    placeholderData: { data: defaultServicesPageData, success: true, timestamp: '' },
  });
  const page = pageRes?.data ?? defaultServicesPageData;

  useSEO({
    title: page.seoTitle,
    description: page.seoDescription,
    ogImage: page.heroImageUrl,
  });

  const { data: servicesRes } = useQuery({ queryKey: ['services'], queryFn: ServicesAPI.getAll });
  const categories = servicesRes?.data ?? [];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        description={page.heroDescription}
        imageUrl={page.heroImageUrl}
        imageAlt={page.heroTitle}
      >
        {/* ── Pillar Cards ─────────────────────────────────────────────── */}
        {categories.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
          >
            {categories.map((category, index) => (
              <PillarCard key={category.id} category={category} index={index} />
            ))}
          </motion.div>
        )}
      </PageHero>

      {/* ── Services List ────────────────────────────────────────────────── */}
      <div className="bg-white">
        {categories.map((category, index) => (
          <SectionWrapper
            key={category.id}
            id={category.id}
            padding="lg"
            background={index % 2 === 0 ? 'white' : 'offwhite'}
            className="border-b border-slate-100 last:border-b-0 scroll-mt-24"
          >
            <Container>
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                {/* Category Info */}
                <div className="lg:w-1/3 flex-shrink-0 lg:sticky lg:top-32 self-start">
                  <SectionTitle
                    title={category.title}
                    description={category.description}
                    showRule={false}
                  />
                </div>

                {/* Services Grid */}
                <div className="lg:w-2/3">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {(category.services ?? []).map((service) => (
                      <ServiceCard key={service.id} service={service} variant="default" />
                    ))}
                  </motion.div>
                </div>
              </div>
            </Container>
          </SectionWrapper>
        ))}
      </div>
    </>
  );
}

// ─── Pillar Card ──────────────────────────────────────────────────────────────

interface PillarCardProps {
  category: ServiceCategory;
  index: number;
}

function PillarCard({ category, index }: PillarCardProps) {
  const accent = PILLAR_ACCENTS[index % PILLAR_ACCENTS.length];
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: string }>>)[category.icon] ?? FileText;

  return (
    <motion.a
      href={`#${category.id}`}
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`
        group relative flex flex-col gap-4 rounded-xl border p-6
        bg-white/95 backdrop-blur-sm hover:shadow-xl hover:bg-white
        transition-all duration-300
        ${accent.border}
        cursor-pointer no-underline
      `}
      aria-label={`Go to ${category.title} section`}
    >
      {/* Pillar number */}
      <span className={`text-xs font-mono font-semibold tracking-widest ${accent.num}`}>
        0{index + 1}
      </span>

      {/* Icon */}
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${accent.bg}`}>
        <IconComponent size={22} aria-hidden="true" className={accent.icon} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 flex-1">
        <h2 className="font-display font-semibold text-navy-700 text-base leading-snug group-hover:text-brick-600 transition-colors duration-200">
          {category.title}
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
          {category.shortDescription}
        </p>
      </div>

      {/* Arrow CTA */}
      <div className={`flex items-center gap-1.5 text-xs font-semibold ${accent.icon} mt-auto`}>
        <span>Explore</span>
        <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </div>
    </motion.a>
  );
}

