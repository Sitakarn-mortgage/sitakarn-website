/**
 * LegalPage Component
 * Institutional Privacy Policy & Terms of Service pages for Sitakarn Mortgage Pvt. Ltd.
 * Eliminates 404 dead links from Footer and ContactForm.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { useCompanyInfo } from '@/hooks/useGlobalContent';
import { PageHero } from '@/components/PageHero/PageHero';
import { Container } from '@/components/Container/Container';
import { SectionWrapper } from '@/components/SectionWrapper/SectionWrapper';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import { images } from '@/assets/images';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export function LegalPage({ type }: LegalPageProps) {
  const companyInfo = useCompanyInfo();
  const isPrivacy = type === 'privacy';

  useSEO({
    title: isPrivacy ? 'Privacy Policy & Client Confidentiality' : 'Terms of Service & Brokerage Standards',
    description: isPrivacy
      ? 'Client data protection, KYC confidentiality, and AML/CFT privacy standards of Sitakarn Mortgage Pvt. Ltd.'
      : 'Terms of engagement, SPIN property due diligence disclosures, and advisory standards of Sitakarn Mortgage Pvt. Ltd.',
  });

  return (
    <>
      <PageHero
        eyebrow="Governance & Legal Disclosures"
        title={isPrivacy ? 'Privacy Policy & Client Confidentiality' : 'Terms of Service & Engagement Standards'}
        description={
          isPrivacy
            ? 'How Sitakarn Mortgage Pvt. Ltd. collects, safeguards, and handles personal, property, and institutional financial records under Nepali law.'
            : 'Conditions governing the use of our website, Sitakarn Property Identification Number (SPIN) listings, brokerage mandates, and financial advisory services.'
        }
        imageUrl={images.hero.about}
        imageAlt={companyInfo.fullName}
      />

      <SectionWrapper padding="lg" background="white">
        <Container size="md">
          <div className="border-b border-slate-200 pb-6 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              {companyInfo.fullName}, {companyInfo.address.full}
              {companyInfo.taxId ? ` — PAN ${companyInfo.taxId}` : ''}
            </p>
            <Link
              to={isPrivacy ? '/terms' : '/privacy'}
              className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium text-brick-600 hover:text-brick-700 shrink-0"
            >
              {isPrivacy ? 'Terms of Service' : 'Privacy Policy'}
              <AppIcon name="ArrowRight" size={14} weight="bold" />
            </Link>
          </div>

          {isPrivacy ? (
            <div className="space-y-8 text-slate-600 leading-relaxed text-sm sm:text-base">
              <section className="space-y-3">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-700">
                  1. Commitment to Client Confidentiality
                </h2>
                <p>
                  {companyInfo.fullName} (&ldquo;Sitakarn&rdquo;) treats all client inquiries, cooperative financial statements, property ownership records (Lalpurja, cadastral maps, tax receipts), and personal identification details with strict institutional confidentiality.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-700">
                  2. Information We Collect (KYC & Mandate Intake)
                </h2>
                <p>
                  When you submit a consultation inquiry, register as a property buyer or seller, or engage our cooperative and financial advisory practice, we collect only the information necessary to evaluate and execute your mandate:
                </p>
                <ul className="space-y-2 pl-1">
                  <li className="flex items-start gap-2.5">
                    <AppIcon name="CheckCircle" size={18} weight="duotone" className="text-gold-600 mt-0.5 shrink-0" />
                    <span>Contact details (name, official email, telephone number, and organization name).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <AppIcon name="CheckCircle" size={18} weight="duotone" className="text-gold-600 mt-0.5 shrink-0" />
                    <span>Mandatory Know-Your-Customer (KYC) and AML/CFT verification records for formal brokerage and mortgage referrals.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <AppIcon name="CheckCircle" size={18} weight="duotone" className="text-gold-600 mt-0.5 shrink-0" />
                    <span>Property title, municipal approval, and financial records shared under formal Non-Disclosure or Engagement Agreements.</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-700">
                  3. Data Usage & Third-Party Disclosure
                </h2>
                <p>
                  Sitakarn never sells or rents client contact lists. Client records are shared exclusively with authorized internal advisors or—with explicit client consent—licensed legal advocates, certified property valuers, commercial banks, and government land revenue offices required to complete your transaction.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-700">
                  4. Contact Our Compliance Desk
                </h2>
                <p>
                  For any questions regarding data privacy, record updates, or confidentiality agreements, please contact our Kathmandu office at{' '}
                  <a href={`mailto:${companyInfo.email}`} className="text-brick-600 underline">
                    {companyInfo.email}
                  </a>{' '}
                  or call {companyInfo.phone}.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-8 text-slate-600 leading-relaxed text-sm sm:text-base">
              <section className="space-y-3">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-700">
                  1. Scope of Services & Professional Engagement
                </h2>
                <p>
                  All content published on this website—including regulatory insights, tax calendars, NFRS guides, and cooperative governance perspectives—is provided for general informational purposes. Formal advisory, audit preparation, or real estate brokerage obligations commence only upon execution of a written Engagement Letter or Brokerage Listing/Buyer Agreement with {companyInfo.fullName}.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-700">
                  2. Real Estate Brokerage & SPIN™ Verification Standards
                </h2>
                <p>
                  Sitakarn assigns a Sitakarn Property Identification Number (SPIN) and conducts structured due diligence under our &ldquo;No Clear Title – No Transaction Recommendation&rdquo; principle. Final title transfer, government registration, and mortgage sanctioning remain subject to official verification at the relevant Land Revenue Office (Malpot), municipal ward office, and partner financial institutions.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-700">
                  3. AML/CFT & Banking Channel First Policy
                </h2>
                <p>
                  All property transactions and financial advisory engagements facilitated by Sitakarn adhere strictly to Nepal&apos;s Anti-Money Laundering (AML/CFT) regulations and our Banking Channel First settlement policy.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-700">
                  4. Governing Law & Jurisdiction
                </h2>
                <p>
                  These terms and all engagements with {companyInfo.fullName} are governed by the prevailing laws of Nepal, under the jurisdiction of the courts of Kathmandu, Nepal.
                </p>
              </section>
            </div>
          )}
        </Container>
      </SectionWrapper>
    </>
  );
}

