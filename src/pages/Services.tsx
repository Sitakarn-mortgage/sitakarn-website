/**
 * Services Page
 * Hero pillar links, a sticky category filter with search, services grouped by pillar,
 * and a detail drawer (also opened via ?service=<slug>).
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useSEO } from '@/hooks/useSEO';
import { ServicesAPI } from '@/api/services';
import { PagesAPI, defaultServicesPageData } from '@/api/pages';
import { servicesData } from '@/data/services';
import { PageHero } from '@/components/PageHero/PageHero';
import { Container } from '@/components/Container/Container';
import { SectionWrapper } from '@/components/SectionWrapper/SectionWrapper';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { ServiceCard } from '@/components/ServiceCard/ServiceCard';
import { ServiceDetailDrawer } from '@/components/ServiceDetailDrawer/ServiceDetailDrawer';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import { Button } from '@/components/Button/Button';
import { fadeUp, staggerContainer } from '@/theme/animations';
import type { Service, ServiceCategory } from '@/types';

export function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activePillar, setActivePillar] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

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

  const { data: servicesRes } = useQuery({
    queryKey: ['services'],
    queryFn: ServicesAPI.getAll,
    placeholderData: { data: servicesData, success: true, timestamp: '' },
  });
  const categories = servicesRes?.data ?? servicesData;

  // Deep link: /services?service=<slug> opens that service's drawer
  useEffect(() => {
    const slug = searchParams.get('service');
    if (!slug) return;
    for (const cat of categories) {
      const match = (cat.services ?? []).find((s) => s.slug === slug || s.id === slug);
      if (match) {
        setSelectedService(match);
        break;
      }
    }
  }, [searchParams, categories]);

  const handleCloseDrawer = () => {
    setSelectedService(null);
    if (searchParams.has('service')) {
      const next = new URLSearchParams(searchParams);
      next.delete('service');
      setSearchParams(next, { replace: true });
    }
  };

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return categories
      .filter((cat) => activePillar === 'all' || cat.id === activePillar)
      .map((cat) => {
        if (!q) return cat;
        const services = (cat.services ?? []).filter((s) =>
          [s.title, s.shortDescription, s.fullDescription ?? '', ...(s.features ?? []), ...(s.targetAudience ?? [])]
            .join(' ')
            .toLowerCase()
            .includes(q)
        );
        return { ...cat, services };
      })
      .filter((cat) => (cat.services ?? []).length > 0);
  }, [categories, activePillar, searchQuery]);

  const totalCount = useMemo(
    () => categories.reduce((sum, cat) => sum + (cat.services?.length ?? 0), 0),
    [categories]
  );

  const selectedCategoryTitle = selectedService
    ? categories.find((c) => c.id === selectedService.categoryId)?.title
    : undefined;

  const tabs = [{ id: 'all', title: `All (${totalCount})` }, ...categories.map((c) => ({ id: c.id, title: c.title }))];

  return (
    <>
      <PageHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        description={page.heroDescription}
        imageUrl={page.heroImageUrl}
        imageAlt={page.heroTitle}
      >
        {categories.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
          >
            {categories.map((category) => (
              <PillarCard key={category.id} category={category} onSelect={() => setActivePillar('all')} />
            ))}
          </motion.div>
        )}
      </PageHero>

      {/* Sticky filter */}
      <div className="sticky top-16 lg:top-24 z-30 bg-white border-b border-slate-200">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-6">
            <div
              className="flex items-center gap-6 overflow-x-auto no-scrollbar"
              role="tablist"
              aria-label="Filter services by category"
            >
              {tabs.map((tab) => {
                const isActive = activePillar === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActivePillar(tab.id)}
                    className={cn(
                      'shrink-0 min-h-[48px] text-sm border-b-2 transition-colors',
                      isActive
                        ? 'border-brick-600 text-brick-600 font-semibold'
                        : 'border-transparent text-slate-600 hover:text-navy-700'
                    )}
                  >
                    {tab.title}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-64 shrink-0 mb-3 md:mb-0">
              <AppIcon
                name="MagnifyingGlass"
                size={18}
                weight="regular"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services"
                aria-label="Search services"
                className="w-full min-h-[44px] pl-10 pr-3 text-sm bg-white border border-slate-300 rounded text-slate-800 placeholder:text-slate-400 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-brick-600 focus:border-brick-600"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Services by category */}
      <div className="bg-white">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <SectionWrapper
              key={category.id}
              id={category.id}
              padding="lg"
              background={index % 2 === 0 ? 'white' : 'offwhite'}
              className="scroll-mt-32"
            >
              <Container>
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                  <div className="lg:w-1/3 shrink-0 lg:sticky lg:top-44 self-start">
                    <SectionTitle title={category.title} description={category.description} showRule={false} />
                  </div>

                  <div className="lg:w-2/3">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-50px' }}
                      variants={staggerContainer}
                      className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10"
                    >
                      {(category.services ?? []).map((service) => (
                        <ServiceCard key={service.id} service={service} onSelect={setSelectedService} />
                      ))}
                    </motion.div>
                  </div>
                </div>
              </Container>
            </SectionWrapper>
          ))
        ) : (
          <SectionWrapper padding="lg" background="offwhite">
            <Container size="md" className="text-center">
              <h2 className="font-display text-2xl font-semibold text-navy-700 mb-2">No services match your search</h2>
              <p className="text-slate-600 mb-6">
                Nothing matched &ldquo;{searchQuery}&rdquo;. Try a different word, or clear the filters.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setActivePillar('all');
                  setSearchQuery('');
                }}
              >
                Clear filters
              </Button>
            </Container>
          </SectionWrapper>
        )}
      </div>

      <ServiceDetailDrawer
        service={selectedService}
        categoryTitle={selectedCategoryTitle}
        onClose={handleCloseDrawer}
      />
    </>
  );
}

// ─── Pillar Card (hero) ───────────────────────────────────────────────────────

function PillarCard({ category, onSelect }: { category: ServiceCategory; onSelect: () => void }) {
  return (
    <motion.a
      href={`#${category.id}`}
      onClick={onSelect}
      variants={fadeUp}
      className="group flex flex-col items-start gap-3 rounded bg-white p-6"
      aria-label={`Go to ${category.title}`}
    >
      <AppIcon name={category.icon} size={28} weight="duotone" className="text-brick-600" />
      <h2 className="font-display font-semibold text-navy-700 text-base leading-snug group-hover:text-brick-600 transition-colors">
        {category.title}
      </h2>
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{category.shortDescription}</p>
    </motion.a>
  );
}
