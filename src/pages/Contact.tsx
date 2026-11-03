/**
 * Contact Page
 * Direct advisory channels with validated ContactForm, interactive map, and FAQ accordion.
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSEO } from '@/hooks/useSEO';
import { FAQAPI } from '@/api/faq';
import { PagesAPI, defaultContactPageData } from '@/api/pages';
import { faqData } from '@/data/faq';
import { useCompanyInfo } from '@/hooks/useGlobalContent';
import { PageHero } from '@/components/PageHero/PageHero';
import { Container } from '@/components/Container/Container';
import { SectionWrapper } from '@/components/SectionWrapper/SectionWrapper';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { ContactForm } from '@/components/ContactForm/ContactForm';
import { FAQAccordion } from '@/components/FAQAccordion/FAQAccordion';
import { AppIcon } from '@/components/AppIcon/AppIcon';

export function Contact() {
  const companyInfo = useCompanyInfo();

  const { data: pageRes } = useQuery({
    queryKey: ['contactPage'],
    queryFn: PagesAPI.getContactPage,
    placeholderData: { data: defaultContactPageData, success: true, timestamp: '' },
  });
  const page = pageRes?.data ?? defaultContactPageData;

  useSEO({
    title: page.seoTitle,
    description: page.seoDescription,
    ogImage: page.heroImageUrl,
  });

  const { data: faqRes } = useQuery({
    queryKey: ['faq'],
    queryFn: FAQAPI.getAll,
    placeholderData: { data: faqData, success: true, timestamp: '' },
  });

  return (
    <>
      <PageHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        description={page.heroDescription}
        imageUrl={page.heroImageUrl}
        imageAlt={page.heroTitle}
      />

      <SectionWrapper padding="lg" background="offwhite" className="border-b border-slate-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact details & social */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <AppIcon name="Phone" size={22} weight="duotone" className="text-brick-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-navy-700">Phone</h3>
                    {companyInfo.phone && (
                      <a
                        href={`tel:${companyInfo.phone}`}
                        className="block text-slate-700 hover:text-brick-600 transition-colors mt-1 text-sm sm:text-base"
                      >
                        {companyInfo.phone}
                      </a>
                    )}
                    {companyInfo.phoneAlt && companyInfo.phoneAlt !== companyInfo.phone && (
                      <a
                        href={`tel:${companyInfo.phoneAlt}`}
                        className="block text-slate-600 hover:text-brick-600 transition-colors mt-0.5 text-sm"
                      >
                        {companyInfo.phoneAlt}
                      </a>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <AppIcon name="EnvelopeSimple" size={22} weight="duotone" className="text-brick-600 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-navy-700">Email</h3>
                    {companyInfo.email && (
                      <a
                        href={`mailto:${companyInfo.email}`}
                        className="block text-slate-700 hover:text-brick-600 transition-colors mt-1 text-sm sm:text-base break-words"
                      >
                        {companyInfo.email}
                      </a>
                    )}
                  </div>
                </div>

                {/* Office */}
                <div className="flex items-start gap-4">
                  <AppIcon name="MapPin" size={22} weight="duotone" className="text-brick-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-navy-700">Office</h3>
                    <p className="text-slate-700 text-sm sm:text-base mt-1 leading-relaxed">
                      {companyInfo.address.street}
                      <br />
                      {companyInfo.address.city} {companyInfo.address.postalCode}
                    </p>
                  </div>
                </div>

                {/* Business hours */}
                {companyInfo.officeHours && companyInfo.officeHours.length > 0 && (
                  <div className="flex items-start gap-4">
                    <AppIcon name="Clock" size={22} weight="duotone" className="text-brick-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-navy-700">Business hours</h3>
                      <div className="mt-1 space-y-1">
                        {companyInfo.officeHours.map((hours) => (
                          <p key={hours.days} className="text-slate-700 text-sm">
                            <span className="font-medium text-navy-700">{hours.days}:</span> {hours.hours}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Block */}
              <div className="flex flex-col gap-3 pt-2">
                <h3 className="font-display font-semibold text-lg text-navy-700">
                  {page.socialTitle}
                </h3>
                {page.socialDescription && (
                  <p className="text-sm text-slate-600">
                    {page.socialDescription}
                  </p>
                )}
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {companyInfo.social.instagram && (
                    <a
                      href={companyInfo.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 min-h-[44px] text-sm text-slate-700 hover:text-brick-600 transition-colors"
                    >
                      <AppIcon name="InstagramLogo" size={20} weight="regular" />
                      <span>Instagram</span>
                    </a>
                  )}
                  {companyInfo.social.facebook && (
                    <a
                      href={companyInfo.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 min-h-[44px] text-sm text-slate-700 hover:text-brick-600 transition-colors"
                    >
                      <AppIcon name="FacebookLogo" size={20} weight="regular" />
                      <span>Facebook</span>
                    </a>
                  )}
                  {companyInfo.social.tiktok && (
                    <a
                      href={companyInfo.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 min-h-[44px] text-sm text-slate-700 hover:text-brick-600 transition-colors"
                    >
                      <AppIcon name="TiktokLogo" size={20} weight="regular" />
                      <span>TikTok</span>
                    </a>
                  )}
                  {companyInfo.social.linkedin && (
                    <a
                      href={companyInfo.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 min-h-[44px] text-sm text-slate-700 hover:text-brick-600 transition-colors"
                    >
                      <AppIcon name="LinkedinLogo" size={20} weight="regular" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {companyInfo.social.youtube && (
                    <a
                      href={companyInfo.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 min-h-[44px] text-sm text-slate-700 hover:text-brick-600 transition-colors"
                    >
                      <AppIcon name="YoutubeLogo" size={20} weight="regular" />
                      <span>YouTube</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Form Container */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200 rounded p-6 sm:p-8">
                <h2 className="font-display font-semibold text-2xl text-navy-700 mb-6">
                  {page.formTitle}
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Office Map */}
      <div className="h-80 sm:h-96 w-full bg-slate-200 relative overflow-hidden">
        <iframe
          src={companyInfo.maps.embedUrl}
          title="Sitakarn Office Location in Kathmandu"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 grayscale"
        />
      </div>

      {/* FAQ */}
      <SectionWrapper id="faq" padding="xl" background="white" className="scroll-mt-24">
        <Container size="md">
          <SectionTitle
            eyebrow={page.faqEyebrow}
            title={page.faqTitle}
            align="center"
            className="mx-auto mb-12"
          />
          {faqRes?.data && <FAQAccordion items={faqRes.data} />}
        </Container>
      </SectionWrapper>
    </>
  );
}
