/**
 * About Page
 * Restrained editorial presentation of Sitakarn's heritage, purpose, core values,
 * brokerage due-diligence framework, and institutional partners.
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { AboutAPI, defaultAboutPageData } from '@/api/about';
import { PartnersAPI } from '@/api/partners';
import { partnersData } from '@/data/partners';
import { useCompanyInfo } from '@/hooks/useGlobalContent';
import { PageHero } from '@/components/PageHero/PageHero';
import { Container } from '@/components/Container/Container';
import { SectionWrapper } from '@/components/SectionWrapper/SectionWrapper';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import { fadeUp, staggerContainer, staggerItem } from '@/theme/animations';

export function About() {
  const companyInfo = useCompanyInfo();

  const { data: aboutRes } = useQuery({
    queryKey: ['aboutPage'],
    queryFn: AboutAPI.getPage,
    placeholderData: {
      data: defaultAboutPageData,
      success: true,
      timestamp: '',
    },
  });

  const { data: partnersRes } = useQuery({
    queryKey: ['partners'],
    queryFn: PartnersAPI.getAll,
    placeholderData: {
      data: partnersData,
      success: true,
      timestamp: '',
    },
  });

  const about = aboutRes?.data ?? defaultAboutPageData;
  const partners = partnersRes?.data ?? partnersData;

  useSEO({
    title: 'About Us',
    description:
      'Learn about our history, mission, and the governance values that drive Sitakarn Mortgage Pvt. Ltd.',
    ogImage: about.images.heroImageUrl,
  });

  const hero = about.hero;
  const story = about.story;
  const values = about.coreValues;
  const re = about.realEstate;
  const certs = about.certifications;

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow={hero.eyebrow}
        title={`${hero.headlinePrefix} ${companyInfo.established}`}
        description={hero.subheadline}
        imageUrl={about.images.heroImageUrl}
        imageAlt={companyInfo.fullName}
      />

      {/* ─── SECTION 1: OUR STORY & 4-PHOTO GRID ──────────────────────────────── */}
      <SectionWrapper padding="lg" background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-start">
            {/* Story copy */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="flex flex-col gap-5"
            >
              {story && (
                <SectionTitle
                  title={story.title}
                  showRule={false}
                />
              )}
              {(story?.paragraphs ?? []).map((para, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="text-slate-600 leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>

            {/* Photo grid: all 4 CMS images, no borders, no captions, no overlays */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className="grid grid-cols-2 gap-3"
            >
              <img
                src={about.images.officeImageUrl}
                alt="Sitakarn corporate headquarters in Kathmandu"
                loading="eager"
                className="aspect-[4/3] w-full object-cover rounded"
              />
              <img
                src={about.images.meetingImageUrl}
                alt="Executive advisory consultation session"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover rounded"
              />
              <img
                src={about.images.teamImageUrl}
                alt="Sitakarn multidisciplinary specialists"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover rounded"
              />
              <img
                src={about.images.communityImageUrl}
                alt="Institutional and community capacity building"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover rounded"
              />
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ─── SECTION 2: CORE VALUES ───────────────────────────────────────────── */}
      {values.length > 0 && (
        <SectionWrapper padding="lg" background="offwhite">
          <Container>
            <SectionTitle
              eyebrow="Our Values"
              title="What guides our work"
              className="mb-12"
            />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8"
            >
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={staggerItem}
                  className="border-t border-slate-300 pt-4 flex flex-col gap-2"
                >
                  <h3 className="font-display font-semibold text-navy-700 text-lg">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </SectionWrapper>
      )}

      {/* ─── SECTION 3: REAL ESTATE BROKERAGE ─────────────────────────────────── */}
      <SectionWrapper padding="lg" background="navy">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-start">
            {/* Left copy */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              {re?.eyebrow && (
                <motion.span variants={fadeUp} className="eyebrow text-brick-200">
                  {re.eyebrow}
                </motion.span>
              )}
              <motion.h2
                variants={fadeUp}
                className="font-display font-bold text-3xl md:text-4xl text-white leading-tight"
              >
                {re?.headline}
              </motion.h2>
              {re?.body1 && (
                <motion.p
                  variants={fadeUp}
                  className="text-white/75 text-base leading-relaxed"
                >
                  {re.body1}
                </motion.p>
              )}
              {re?.body2 && (
                <motion.p
                  variants={fadeUp}
                  className="text-white/75 text-base leading-relaxed"
                >
                  {re.body2}
                </motion.p>
              )}
            </motion.div>

            {/* Right highlights list */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="divide-y divide-white/15 border-y border-white/15"
            >
              {(re?.highlights ?? []).map((item) => (
                <motion.div
                  key={item.label}
                  variants={staggerItem}
                  className="py-5 flex items-start gap-4"
                >
                  <AppIcon
                    name={item.icon}
                    size={28}
                    weight="duotone"
                    className="text-brick-200 shrink-0 mt-0.5"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-white text-base">
                      {item.label}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ─── SECTION 4: CERTIFICATIONS & PARTNERS ─────────────────────────────── */}
      <SectionWrapper padding="lg" background="white">
        <Container>
          {certs && (
            <SectionTitle
              eyebrow={certs.eyebrow}
              title={certs.title}
              description={certs.description}
              align="center"
              className="mx-auto mb-12"
            />
          )}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-x-10 gap-y-8"
          >
            {partners.map((partner) => {
              const content = (
                <div className="flex flex-col items-center text-center gap-2 max-w-[200px]">
                  <div className="h-14 flex items-center justify-center">
                    {partner.logoUrl ? (
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className="max-h-14 max-w-full object-contain"
                      />
                    ) : (
                      <span className="font-mono text-sm font-bold text-navy-700">
                        {partner.shortCode || partner.name.split(' ')[0]}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-slate-600 leading-snug">
                    {partner.name}
                  </span>
                </div>
              );

              return partner.website ? (
                <motion.a
                  key={partner.id}
                  variants={staggerItem}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick-600 rounded"
                >
                  {content}
                </motion.a>
              ) : (
                <motion.div key={partner.id} variants={staggerItem} className="flex">
                  {content}
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </SectionWrapper>
    </>
  );
}
