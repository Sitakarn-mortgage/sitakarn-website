/**
 * Footer Component
 * Multi-column professional footer reading from footerData and company config.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Logo } from '@/components/Logo/Logo';
import { SocialIcons } from '@/components/SocialIcons/SocialIcons';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import { useCompanyInfo, useFooter } from '@/hooks/useGlobalContent';
import { ContactAPI } from '@/api/contact';

export function Footer() {
  const companyInfo = useCompanyInfo();
  const footer = useFooter();
  const [email, setEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setNewsletterState('loading');
    try {
      await ContactAPI.subscribeNewsletter(email);
      setNewsletterState('success');
      setEmail('');
    } catch {
      setNewsletterState('error');
    }
  };

  return (
    <footer className="bg-navy-700 text-white" role="contentinfo">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Logo theme="dark" size="md" />
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              {companyInfo.description}
            </p>

            {/* Contact info */}
            <address className="not-italic flex flex-col gap-3">
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors min-h-[44px] py-1"
              >
                <AppIcon name="Phone" size={16} weight="duotone" className="text-white/50 flex-shrink-0" />
                {companyInfo.phone}
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors min-h-[44px] py-1"
              >
                <AppIcon name="EnvelopeSimple" size={16} weight="duotone" className="text-white/50 flex-shrink-0" />
                {companyInfo.email}
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white/60 py-1">
                <AppIcon name="MapPin" size={16} weight="duotone" className="text-white/50 flex-shrink-0 mt-0.5" />
                <span>{companyInfo.address.full}</span>
              </div>
            </address>

            <SocialIcons theme="dark" size="md" />
          </div>

          {/* Link columns */}
          {footer.columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              {/* Column title with double rule */}
              <div className="flex flex-col gap-2">
                <div className="double-rule text-white/50" aria-hidden="true" />
                <h3 className="text-white text-sm font-semibold tracking-wide uppercase font-mono">
                  {column.title}
                </h3>
              </div>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-150 flex items-center gap-1 group py-1 min-h-[44px] sm:min-h-0"
                    >
                      <AppIcon
                        name="ArrowRight"
                        size={12}
                        weight="regular"
                        className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-10 border-t border-navy-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-lg text-white font-semibold mb-2">
                {footer.newsletterTitle || 'Stay Informed'}
              </h3>
              <p className="text-sm text-white/50">
                {footer.newsletterDescription || 'Receive our monthly insights on cooperative finance, tax updates, and regulatory changes.'}
              </p>
            </div>
            <form onSubmit={handleNewsletter} noValidate>
              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  disabled={newsletterState === 'loading' || newsletterState === 'success'}
                  className={cn(
                    'flex-1 px-4 py-3 text-sm rounded min-h-[44px]',
                    'bg-navy-800 text-white placeholder:text-white/30',
                    'border border-white/15 focus:border-brick-400',
                    'focus:outline-none focus:ring-1 focus:ring-brick-400',
                    'transition-colors duration-150'
                  )}
                />
                <button
                  type="submit"
                  disabled={newsletterState === 'loading' || newsletterState === 'success'}
                  className={cn(
                    'flex-shrink-0 px-6 py-3 text-sm font-semibold rounded min-h-[44px]',
                    'bg-brick-600 text-white hover:bg-brick-700',
                    'transition-colors duration-150',
                    'disabled:opacity-60 disabled:cursor-not-allowed'
                  )}
                >
                  {newsletterState === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {newsletterState === 'success' && (
                <p className="mt-2 text-xs text-white/60 flex items-center gap-1.5">
                  <AppIcon name="CheckCircle" size={14} weight="duotone" />
                  You&apos;ve been subscribed. Thank you.
                </p>
              )}
              {newsletterState === 'error' && (
                <p className="mt-2 text-xs text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Legal certifications / accreditations */}
        {footer.certifications && footer.certifications.length > 0 && (
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2">
            {footer.certifications.map((cert) => (
              <span key={cert} className="text-xs text-white/35 font-mono">
                {cert}
              </span>
            ))}
          </div>
        )}

        {/* Bottom bar */}
        <div
          className={cn(
            'pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
            footer.certifications && footer.certifications.length > 0
              ? 'mt-4 border-t border-white/5'
              : 'mt-10 border-t border-white/10'
          )}
        >
          <p className="text-xs text-white/40">{companyInfo.copyright}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <Link to="/privacy" className="text-xs text-white/40 hover:text-white transition-colors min-h-[44px] sm:min-h-0 py-1">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-white/40 hover:text-white transition-colors min-h-[44px] sm:min-h-0 py-1">Terms of Service</Link>
            {companyInfo.taxId && <span className="text-xs text-white/30 py-1">Tax ID: {companyInfo.taxId}</span>}
          </div>
        </div>
      </div>
    </footer>
  );
}
