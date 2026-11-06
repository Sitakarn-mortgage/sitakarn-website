/**
 * Home Page
 * Preserves all TanStack Query + Strapi data hooks and static placeholderData.
 */

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { defaultHomepageData, HomepageAPI } from '@/api/homepage';
import { ServicesAPI } from '@/api/services';
import { TestimonialsAPI } from '@/api/testimonials';
import { BlogAPI } from '@/api/blog';
import { whoWeHelpData, whyChooseUsData, processStepsData } from '@/data/homepage';
import { statisticsData } from '@/data/statistics';
import { testimonialsData } from '@/data/testimonials';
import { blogData } from '@/data/blog';
import { servicesData } from '@/data/services';
import { Container } from '@/components/Container/Container';
import { SectionWrapper } from '@/components/SectionWrapper/SectionWrapper';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Button } from '@/components/Button/Button';
import { FeatureCard } from '@/components/FeatureCard/FeatureCard';
import { ServiceCard } from '@/components/ServiceCard/ServiceCard';
import { ServiceDetailDrawer } from '@/components/ServiceDetailDrawer/ServiceDetailDrawer';
import { StatisticCard } from '@/components/StatisticCard/StatisticCard';
import { Timeline } from '@/components/Timeline/Timeline';
import { TestimonialCard } from '@/components/TestimonialCard/TestimonialCard';
import { InsightCard } from '@/components/InsightCard/InsightCard';
import { Divider } from '@/components/Divider/Divider';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import { fadeUp, staggerContainer } from '@/theme/animations';
import { images } from '@/assets/images';
import type { Service } from '@/types';

export function Home() {
  useSEO({
    title: 'Home',
    description:
      "Nepal's pioneering professional real estate brokerage and financial advisory firm — transparent, technology-enabled, and legally compliant services.",
  });

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const { data: homepageRes } = useQuery({
    queryKey: ['homepage'],
    queryFn: HomepageAPI.getPage,
    placeholderData: { data: defaultHomepageData, success: true, timestamp: '' },
  });
  const { data: whoWeHelpRes } = useQuery({
    queryKey: ['whoWeHelp'],
    queryFn: HomepageAPI.getWhoWeHelp,
    placeholderData: { data: whoWeHelpData, success: true, timestamp: '' },
  });
  const { data: servicesRes } = useQuery({
    queryKey: ['servicesFeatured'],
    queryFn: () => ServicesAPI.getFeatured(3),
    placeholderData: { data: servicesData.flatMap((c) => c.services).slice(0, 3), success: true, timestamp: '' },
  });
  const { data: whyChooseUsRes } = useQuery({
    queryKey: ['whyChooseUs'],
    queryFn: HomepageAPI.getWhyChooseUs,
    placeholderData: { data: whyChooseUsData, success: true, timestamp: '' },
  });
  const { data: statsRes } = useQuery({
    queryKey: ['statistics'],
    queryFn: HomepageAPI.getStatistics,
    placeholderData: { data: statisticsData, success: true, timestamp: '' },
  });
  const { data: processRes } = useQuery({
    queryKey: ['process'],
    queryFn: HomepageAPI.getProcessSteps,
    placeholderData: { data: processStepsData, success: true, timestamp: '' },
  });
  const { data: testimonialsRes } = useQuery({
    queryKey: ['testimonialsFeatured'],
    queryFn: TestimonialsAPI.getFeatured,
    placeholderData: { data: testimonialsData.filter((t) => t.featured).slice(0, 3), success: true, timestamp: '' },
  });
  const { data: blogRes } = useQuery({
    queryKey: ['blogFeatured'],
    queryFn: () => BlogAPI.getFeatured(3),
    placeholderData: { data: blogData.slice(0, 3), success: true, timestamp: '' },
  });

  const page = homepageRes?.data ?? defaultHomepageData;
  const { hero, sections, bottomCta } = page;

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────────────────── */}
      <SectionWrapper padding="none" background="offwhite" className="pt-10 pb-16 md:pt-14 md:pb-20 lg:pt-16 lg:pb-24">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              {hero && (
                <>
                  <motion.div variants={fadeUp} className="flex items-center gap-3">
                    <Divider />
                    <span className="eyebrow">{hero.eyebrow}</span>
                  </motion.div>
                  <motion.h1 variants={fadeUp} className="font-display font-bold text-navy-700">
                    {hero.headline}
                  </motion.h1>
                  <motion.p variants={fadeUp} className="text-lg text-slate-600 leading-relaxed max-w-xl">
                    {hero.subheadline}
                  </motion.p>
                  <motion.div
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 pt-2"
                  >
                    <Button as="a" href={hero.primaryCTA.href} size="lg">
                      {hero.primaryCTA.label}
                    </Button>
                    <Button as="a" href={hero.secondaryCTA.href} variant="outline" size="lg">
                      {hero.secondaryCTA.label}
                    </Button>
                  </motion.div>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="aspect-[4/3] lg:aspect-auto lg:h-[560px] overflow-hidden rounded"
            >
              <img
                src={hero.heroImageUrl || images.hero.main}
                alt="Financial consulting professionals in a meeting"
                className="size-full object-cover"
                fetchPriority="high"
              />
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ─── WHO WE SERVE ─────────────────────────────────────────────────────── */}
      <SectionWrapper padding="lg" background="white">
        <Container>
          <SectionTitle
            eyebrow={sections.whoWeHelp.eyebrow}
            title={sections.whoWeHelp.title}
            description={sections.whoWeHelp.description}
            align="center"
            className="mx-auto mb-14"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12"
          >
            {(whoWeHelpRes?.data ?? []).map((item) => (
              <FeatureCard key={item.id} title={item.title} description={item.description} icon={item.icon} />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* ─── FEATURED SERVICES ────────────────────────────────────────────────── */}
      <SectionWrapper padding="lg" background="offwhite">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionTitle
              eyebrow={sections.services.eyebrow}
              title={sections.services.title}
              description={sections.services.description}
            />
            <Button
              as="a"
              href="/services"
              variant="outline"
              rightIcon={<AppIcon name="ArrowRight" size={16} weight="bold" />}
              className="shrink-0 self-start md:self-auto"
            >
              View All Services
            </Button>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10"
          >
            {(servicesRes?.data ?? []).map((service) => (
              <ServiceCard key={service.id} service={service} onSelect={setSelectedService} />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* ─── WHY CHOOSE US & STATS ────────────────────────────────────────────── */}
      <SectionWrapper padding="xl" background="navy">
        <div className="absolute top-0 left-0 right-0 h-1 bg-brick-600" aria-hidden="true" />
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <SectionTitle
                theme="dark"
                eyebrow={sections.whyChooseUs.eyebrow}
                title={sections.whyChooseUs.title}
                description={sections.whyChooseUs.description}
                className="mb-10"
              />
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={staggerContainer}
                className="flex flex-col divide-y divide-white/15 border-y border-white/15"
              >
                {(whyChooseUsRes?.data ?? []).map((item) => (
                  <li key={item.id} className="flex gap-4 py-6">
                    <AppIcon
                      name={item.icon || 'ShieldCheck'}
                      size={28}
                      weight="duotone"
                      className="text-brick-200 mt-0.5"
                    />
                    <div>
                      <h3 className="font-display font-semibold text-lg text-white mb-1.5">{item.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12 content-center"
            >
              {(statsRes?.data ?? []).map((stat) => (
                <StatisticCard key={stat.id} stat={stat} theme="dark" />
              ))}
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ─── PROCESS ──────────────────────────────────────────────────────────── */}
      <SectionWrapper padding="lg" background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
              <SectionTitle
                eyebrow={sections.process.eyebrow}
                title={sections.process.title}
                description={sections.process.description}
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              {processRes?.data && <Timeline steps={processRes.data} />}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <SectionWrapper padding="lg" background="offwhite">
        <Container>
          <SectionTitle
            eyebrow={sections.testimonials.eyebrow}
            title={sections.testimonials.title}
            description={sections.testimonials.description}
            align="center"
            className="mx-auto mb-14"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {(testimonialsRes?.data ?? []).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* ─── INSIGHTS ─────────────────────────────────────────────────────────── */}
      <SectionWrapper padding="lg" background="white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionTitle
              eyebrow={sections.insights.eyebrow}
              title={sections.insights.title}
              description={sections.insights.description}
            />
            <Button
              as="a"
              href="/insights"
              variant="outline"
              rightIcon={<AppIcon name="ArrowRight" size={16} weight="bold" />}
              className="shrink-0 self-start md:self-auto"
            >
              View All Articles
            </Button>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {(blogRes?.data ?? []).map((post) => (
              <InsightCard key={post.id} post={post} />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* ─── CTA ──────────────────────────────────────────────────────────────── */}
      <SectionWrapper padding="lg" background="navy">
        <Container className="text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            {bottomCta.headline}
          </h2>
          <p className="text-white/75 text-lg mb-10 max-w-2xl mx-auto">{bottomCta.description}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button as="a" href={bottomCta.primaryCTA.href} size="lg" variant="gold">
              {bottomCta.primaryCTA.label}
            </Button>
            <Button
              as="a"
              href={bottomCta.secondaryCTA.href}
              size="lg"
              className="border border-white/40 text-white hover:bg-white/10"
            >
              {bottomCta.secondaryCTA.label}
            </Button>
          </div>
        </Container>
      </SectionWrapper>

      <ServiceDetailDrawer
        service={selectedService}
        categoryTitle={servicesData.find((c) => c.id === selectedService?.categoryId)?.title}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
}
