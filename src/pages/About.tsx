/**
 * About Page
 * Content driven by Strapi CMS via AboutAPI, with static fallback.
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { AboutAPI, defaultAboutPageData } from '@/api/about';
import { PartnersAPI } from '@/api/partners';
import { partnersData } from '@/data/partners';
import { useCompanyInfo } from '@/hooks/useGlobalContent';
import { PageHero } from '@/components/PageHero/PageHero';
import { Container } from '@/components/Container/Container';
import { SectionWrapper } from '@/components/SectionWrapper/SectionWrapper';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Divider } from '@/components/Divider/Divider';
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
    description: 'Learn about our history, mission, and the values that drive our financial consulting practice.',
    ogImage: about.images.heroImageUrl,
  });

  // Derive section data
  const hero = about.hero;
  const story = about.story;
  const values = about.coreValues;
  const re = about.realEstate;
  const certs = about.certifications;

  return (
    <>
      {/* ─── HEADER ───────────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow={hero.eyebrow}
        title={`${hero.headlinePrefix} ${companyInfo.established}`}
        description={hero.subheadline}
        imageUrl={about.images.heroImageUrl}
        imageAlt={companyInfo.fullName}
      />

      {/* ─── STORY & VALUES ───────────────────────────────────────────────────── */}
      <SectionWrapper padding="lg" background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              {story && <SectionTitle title={story.title} showRule={false} />}
              {(story?.paragraphs ?? []).map((para, i) => (
                <motion.p key={i} variants={fadeUp} className="text-slate-600 leading-relaxed">
                  {para}
                </motion.p>
              ))}

              {values.length > 0 && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {values.map((value) => (
                    <motion.div key={value.title} variants={fadeUp} className="flex gap-3">
                      <CheckCircle className="text-gold-500 flex-shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-navy-700 mb-1">{value.title}</h4>
                        <p className="text-sm text-slate-500">{value.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded overflow-hidden shadow-xl">
                <img src={about.images.officeImageUrl} alt="Our office" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 aspect-square rounded overflow-hidden shadow-lg border-4 border-white hidden md:block">
                <img src={about.images.meetingImageUrl} alt="Team meeting" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ─── REAL ESTATE BROKERAGE HIGHLIGHT ──────────────────────────────────── */}
      <SectionWrapper padding="lg" background="navy" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-700 to-brick-800 opacity-95" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <Divider theme="dark" />
                <span className="eyebrow text-white/70">{re?.eyebrow}</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display font-bold text-3xl md:text-4xl text-white leading-tight">
                {re?.headline}
              </motion.h2>
              {re?.body1 && (
                <motion.p variants={fadeUp} className="text-white/70 leading-relaxed">
                  {re.body1}
                </motion.p>
              )}
              {re?.body2 && (
                <motion.p variants={fadeUp} className="text-white/70 leading-relaxed">
                  {re.body2}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4"
            >
              {(re?.highlights ?? []).map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/15 transition-colors"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h4 className="font-semibold text-white text-sm mb-1">{item.label}</h4>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ─── CERTIFICATIONS ───────────────────────────────────────────────────── */}
      <SectionWrapper padding="lg" background="offwhite">
        <Container>
          {certs && (
            <SectionTitle
              eyebrow={certs.eyebrow}
              title={certs.title}
              description={certs.description}
              align="center"
              className="mx-auto mb-16"
            />
          )}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
          >
            {partners.map((partner) => {
              const cardContent = (
                <>
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm p-4 border border-slate-100">
                    {partner.logoUrl ? (
                      <img src={partner.logoUrl} alt={partner.name} className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="font-mono text-xs font-bold text-navy-700 tracking-wider">
                        {partner.shortCode || partner.name.split(' ')[0]}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-slate-500">{partner.name}</span>
                </>
              );

              return (
                <motion.div key={partner.id} variants={staggerItem} className="flex flex-col items-center gap-2 max-w-[150px] text-center">
                  {partner.website ? (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 hover:opacity-100 transition-opacity"
                    >
                      {cardContent}
                    </a>
                  ) : (
                    cardContent
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </SectionWrapper>
    </>
  );
}
