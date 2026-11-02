/**
 * Contact Page
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { FAQAPI } from '@/api/faq';
import { PagesAPI, defaultContactPageData } from '@/api/pages';
import { useCompanyInfo } from '@/hooks/useGlobalContent';
import { PageHero } from '@/components/PageHero/PageHero';
import { Container } from '@/components/Container/Container';
import { SectionWrapper } from '@/components/SectionWrapper/SectionWrapper';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { ContactForm } from '@/components/ContactForm/ContactForm';
import { FAQAccordion } from '@/components/FAQAccordion/FAQAccordion';
import { fadeUp } from '@/theme/animations';

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

  const { data: faqRes } = useQuery({ queryKey: ['faq'], queryFn: FAQAPI.getAll });

  return (
    <>
      <PageHero
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        description={page.heroDescription}
        imageUrl={page.heroImageUrl}
        imageAlt={page.heroTitle}
      />

      <SectionWrapper padding="lg" background="offwhite">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Contact Info */}
            <div className="lg:col-span-5 flex flex-col gap-10">
              <div className="flex flex-col gap-8">
                {/* Contact Methods */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded shadow-sm border border-slate-100 flex items-center justify-center text-gold-600 flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-700">Phone</h4>
                    {companyInfo.phone && (
                      <a href={`tel:${companyInfo.phone}`} className="block text-slate-600 hover:text-brick-600 transition-colors mt-1">
                        {companyInfo.phone}
                      </a>
                    )}
                    {companyInfo.phoneAlt && companyInfo.phoneAlt !== companyInfo.phone && (
                      <a href={`tel:${companyInfo.phoneAlt}`} className="block text-slate-600 hover:text-brick-600 transition-colors">
                        {companyInfo.phoneAlt}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded shadow-sm border border-slate-100 flex items-center justify-center text-gold-600 flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-700">Email</h4>
                    {companyInfo.email && (
                      <a href={`mailto:${companyInfo.email}`} className="block text-slate-600 hover:text-brick-600 transition-colors mt-1">
                        {companyInfo.email}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded shadow-sm border border-slate-100 flex items-center justify-center text-gold-600 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-700">Office</h4>
                    <p className="text-slate-600 mt-1">
                      {companyInfo.address.street}
                      <br />
                      {companyInfo.address.city} {companyInfo.address.postalCode}
                    </p>
                  </div>
                </div>

                {companyInfo.officeHours && companyInfo.officeHours.length > 0 && (
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded shadow-sm border border-slate-100 flex items-center justify-center text-gold-600 flex-shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-700">Business Hours</h4>
                      {companyInfo.officeHours.map((hours) => (
                        <p key={hours.days} className="text-slate-600 mt-1">
                          <span className="font-medium">{hours.days}:</span> {hours.hours}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Social Media */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h4 className="font-semibold text-navy-700 mb-1">{page.socialTitle}</h4>
                  <p className="text-sm text-slate-500 mb-4">{page.socialDescription}</p>
                  <div className="flex flex-col gap-3">
                    {companyInfo.social.instagram && (
                      <a
                        href={companyInfo.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-white flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-navy-700 group-hover:text-brick-600 transition-colors">Instagram</p>
                          <p className="text-xs text-slate-400">@sitakarn.np</p>
                        </div>
                      </a>
                    )}
                    {companyInfo.social.facebook && (
                      <a
                        href={companyInfo.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center text-white flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-navy-700 group-hover:text-brick-600 transition-colors">Facebook</p>
                          <p className="text-xs text-slate-400">Sitakarn</p>
                        </div>
                      </a>
                    )}
                    {companyInfo.social.tiktok && (
                      <a
                        href={companyInfo.social.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-white flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-navy-700 group-hover:text-brick-600 transition-colors">TikTok</p>
                          <p className="text-xs text-slate-400">@sitakarn.np</p>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-10 rounded shadow-sm border border-slate-200">
                <h3 className="font-display font-semibold text-2xl text-navy-700 mb-6">{page.formTitle}</h3>
                <ContactForm />
              </div>
            </div>

          </div>
        </Container>
      </SectionWrapper>

      {/* Office Map */}
      <div className="h-96 w-full bg-slate-200 relative overflow-hidden">
        <iframe
          src={companyInfo.maps.embedUrl}
          title="Office Location"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 grayscale contrast-125 opacity-80"
        />
        <div className="absolute inset-0 pointer-events-none border-t border-b border-slate-200" />
      </div>

      {/* FAQ */}
      <SectionWrapper id="faq" padding="xl" background="white">
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
