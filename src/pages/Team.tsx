/**
 * Team Page
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { TeamAPI } from '@/api/team';
import { PagesAPI, defaultTeamPageData } from '@/api/pages';
import { PageHero } from '@/components/PageHero/PageHero';
import { Container } from '@/components/Container/Container';
import { SectionWrapper } from '@/components/SectionWrapper/SectionWrapper';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { TeamCard } from '@/components/TeamCard/TeamCard';
import { staggerContainer } from '@/theme/animations';

export function Team() {
  const { data: pageRes } = useQuery({
    queryKey: ['teamPage'],
    queryFn: PagesAPI.getTeamPage,
    placeholderData: { data: defaultTeamPageData, success: true, timestamp: '' },
  });
  const page = pageRes?.data ?? defaultTeamPageData;

  useSEO({
    title: page.seoTitle,
    description: page.seoDescription,
    ogImage: page.heroImageUrl,
  });

  const { data: leadershipRes } = useQuery({ queryKey: ['team', 'leadership'], queryFn: () => TeamAPI.getByRole('leadership') });
  const { data: consultantsRes } = useQuery({ queryKey: ['team', 'consultant'], queryFn: () => TeamAPI.getByRole('consultant') });

  return (
    <>
      <PageHero
        align="center"
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        description={page.heroDescription}
        imageUrl={page.heroImageUrl}
        imageAlt={page.heroTitle}
      />

      {/* Leadership */}
      <SectionWrapper padding="none" background="white">
        {/* Section header — contained */}
        <div className="py-16 md:py-20">
          <Container>
            <SectionTitle eyebrow={page.leadershipEyebrow} title={page.leadershipTitle} />
          </Container>
        </div>

        {/* Full-bleed leader rows */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col"
        >
          {(leadershipRes?.data ?? []).map((member, i) => (
            <TeamCard key={member.id} member={member} variant="leadership" index={i} />
          ))}
        </motion.div>
      </SectionWrapper>

      {/* Consultants */}
      <SectionWrapper padding="lg" background="offwhite">
        <Container>
          <SectionTitle eyebrow={page.consultantsEyebrow} title={page.consultantsTitle} className="mb-12" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {(consultantsRes?.data ?? []).map((member) => (
              <TeamCard key={member.id} member={member} variant="consultant" />
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>
    </>
  );
}
