/**
 * Navbar Component
 * Sticky navigation with desktop 2-column Services mega-flyout and mobile menu.
 * Reads navigation structure from navigationData and servicesData.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { Logo } from '@/components/Logo/Logo';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import { useCompanyInfo, useNavigation } from '@/hooks/useGlobalContent';
import { servicesData } from '@/data/services';
import type { NavLink } from '@/types';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const companyInfo = useCompanyInfo();
  const navigation = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu & dropdown on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Outside click & Escape key listener for desktop dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isActive = useCallback((href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  }, [location.pathname]);

  const handleDropdown = (label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 transition-shadow duration-200',
          isScrolled && 'shadow-sm',
          className
        )}
      >
        {/* Top bar — contact info (white on brick; no gold on colored backgrounds) */}
        <div className="hidden lg:block bg-brick-600 text-white text-xs">
          <div className="max-w-7xl mx-auto px-8 h-8 flex items-center justify-between">
            <span className="font-mono tracking-wide text-white/90">
              {companyInfo.fullName} — Est. {companyInfo.established}
            </span>
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-1.5 hover:underline"
              aria-label={`Call us: ${companyInfo.phone}`}
            >
              <AppIcon name="Phone" size={14} weight="regular" />
              <span>{companyInfo.phone}</span>
            </a>
          </div>
        </div>

        {/* Main navigation */}
        <nav
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="h-16 flex items-center justify-between gap-6">
            {/* Logo */}
            <Logo theme="light" size="md" />

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {navigation.links.map((link) => (
                <DesktopNavItem
                  key={link.label}
                  link={link}
                  isActive={isActive(link.href)}
                  isDropdownOpen={activeDropdown === link.label}
                  onDropdownToggle={handleDropdown}
                />
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to={navigation.cta.href}
                className={cn(
                  'inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded',
                  'bg-gold-400 text-navy-900 hover:bg-gold-300',
                  'transition-all duration-200 shadow-sm hover:shadow-gold',
                  'tracking-wide border border-gold-500'
                )}
              >
                {navigation.cta.label}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded text-brick-600 hover:bg-brick-50 transition-colors"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <AppIcon name={mobileOpen ? 'X' : 'List'} size={24} weight="regular" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-navy-900/50 lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="mobile-drawer"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0, 0, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-84 max-w-full bg-white shadow-xl lg:hidden overflow-y-auto flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 min-h-[64px]">
                <Logo theme="light" size="sm" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-11 h-11 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 transition-colors"
                  aria-label="Close menu"
                >
                  <AppIcon name="X" size={22} weight="regular" />
                </button>
              </div>

              {/* Links */}
              <div className="px-4 py-6 flex flex-col gap-1 flex-1">
                {navigation.links.map((link) => (
                  <MobileNavItem
                    key={link.label}
                    link={link}
                    isActive={isActive(link.href)}
                    activeDropdown={activeDropdown}
                    onDropdownToggle={handleDropdown}
                  />
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="px-6 pb-4 mt-auto">
                <Link
                  to={navigation.cta.href}
                  className="block w-full text-center py-3.5 px-6 bg-gold-400 text-navy-900 text-sm font-semibold rounded min-h-[46px] flex items-center justify-center hover:bg-gold-300 border border-gold-500 transition-colors shadow-sm"
                >
                  {navigation.cta.label}
                </Link>
              </div>

              {/* Bottom contact card in drawer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-col gap-2">
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-center gap-2.5 text-sm font-medium text-slate-700 hover:text-navy-900 min-h-[44px]"
                >
                  <AppIcon name="Phone" size={16} weight="duotone" className="text-brick-600" />
                  {companyInfo.phone}
                </a>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-2.5 text-sm font-medium text-slate-700 hover:text-navy-900 min-h-[44px]"
                >
                  <AppIcon name="EnvelopeSimple" size={16} weight="duotone" className="text-brick-600" />
                  {companyInfo.email}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header: 64px mobile; 32px top bar + 64px nav on desktop */}
      <div className="h-16 lg:h-24" aria-hidden="true" />
    </>
  );
}

// ─── Desktop Nav Item ──────────────────────────────────────────────────────────

interface DesktopNavItemProps {
  link: NavLink;
  isActive: boolean;
  isDropdownOpen: boolean;
  onDropdownToggle: (label: string) => void;
}

function DesktopNavItem({ link, isActive, isDropdownOpen, onDropdownToggle }: DesktopNavItemProps) {
  const hasChildren = link.label === 'Services' || (link.children && link.children.length > 0);

  if (!hasChildren) {
    return (
      <Link
        to={link.href}
        className={cn(
          'px-3.5 py-2 text-sm font-medium rounded transition-colors duration-150',
          isActive
            ? 'text-brick-600 bg-brick-50 font-semibold'
            : 'text-slate-700 hover:text-brick-600 hover:bg-brick-50'
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => onDropdownToggle(link.label)}
        className={cn(
          'flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded transition-colors duration-150',
          isActive || isDropdownOpen
            ? 'text-brick-600 bg-brick-50 font-semibold'
            : 'text-slate-700 hover:text-brick-600 hover:bg-brick-50'
        )}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        {link.label}
        <AppIcon
          name="CaretDown"
          size={14}
          weight="regular"
          className={cn('transition-transform duration-200', isDropdownOpen && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 w-[34rem] p-2 bg-white rounded border border-slate-200 shadow-lg z-50"
            role="menu"
          >
            <div className="grid grid-cols-2">
              {servicesData.map((pillar) => (
                <Link
                  key={pillar.id}
                  to={`/services#${pillar.id}`}
                  className="group flex flex-col items-start gap-2 p-4 rounded hover:bg-slate-50"
                  role="menuitem"
                >
                  <AppIcon name={pillar.icon} size={24} weight="duotone" className="text-brick-600" />
                  <span className="font-display font-semibold text-sm text-navy-700 group-hover:text-brick-600 leading-snug">
                    {pillar.title}
                  </span>
                  <span className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {pillar.shortDescription}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-1 pt-1 border-t border-slate-200">
              <Link
                to="/services"
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-brick-600 hover:bg-slate-50 rounded"
              >
                <span>View all services</span>
                <AppIcon name="ArrowRight" size={14} weight="bold" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile Nav Item ───────────────────────────────────────────────────────────

interface MobileNavItemProps {
  link: NavLink;
  isActive: boolean;
  activeDropdown: string | null;
  onDropdownToggle: (label: string) => void;
}

function MobileNavItem({ link, isActive, activeDropdown, onDropdownToggle }: MobileNavItemProps) {
  const hasChildren = link.label === 'Services' || (link.children && link.children.length > 0);
  const isOpen = activeDropdown === link.label;

  if (!hasChildren) {
    return (
      <Link
        to={link.href}
        className={cn(
          'block px-4 py-3.5 text-sm font-medium rounded min-h-[44px] flex items-center transition-colors',
          isActive
            ? 'text-brick-600 bg-brick-50 font-semibold'
            : 'text-slate-700 hover:text-brick-600 hover:bg-brick-50'
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => onDropdownToggle(link.label)}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium rounded min-h-[44px] transition-colors',
          isActive || isOpen
            ? 'text-brick-600 bg-brick-50 font-semibold'
            : 'text-slate-700 hover:text-brick-600 hover:bg-brick-50'
        )}
        aria-expanded={isOpen}
      >
        <span>{link.label}</span>
        <AppIcon
          name="CaretDown"
          size={16}
          weight="regular"
          className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="ml-4 pl-4 border-l-2 border-brick-200 py-2 flex flex-col gap-1">
              <Link
                to="/services"
                className="block px-3 py-3 text-sm font-semibold text-brick-600 hover:bg-brick-50 rounded min-h-[44px] flex items-center"
              >
                All Services Overview
              </Link>
              {servicesData.map((pillar) => (
                <Link
                  key={pillar.id}
                  to={`/services#${pillar.id}`}
                  className="flex items-center gap-3 px-3 py-3 text-sm text-slate-600 hover:text-brick-600 hover:bg-brick-50 rounded min-h-[44px] transition-colors"
                >
                  <AppIcon name={pillar.icon} size={20} weight="duotone" className="text-brick-600 shrink-0" />
                  <span className="line-clamp-1">{pillar.title}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
