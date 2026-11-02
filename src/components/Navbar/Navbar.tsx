/**
 * Navbar Component
 * Sticky navigation with desktop dropdowns and mobile menu.
 * Reads navigation structure from navigationData.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Logo } from '@/components/Logo/Logo';
import { useCompanyInfo, useNavigation } from '@/hooks/useGlobalContent';
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

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/97 backdrop-blur-md shadow-md border-b border-brick-100'
            : 'bg-white border-b border-brick-100',
          className
        )}
      >
        {/* Top bar — contact info */}
        <div className="hidden lg:block bg-brick-600 text-brick-100 text-xs">
          <div className="max-w-7xl mx-auto px-8 h-8 flex items-center justify-between">
            <span className="font-mono tracking-wide text-gold-200">
              {companyInfo.fullName} — Est. {companyInfo.established}
            </span>
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
              aria-label={`Call us: ${companyInfo.phone}`}
            >
              <Phone size={12} aria-hidden="true" />
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
            <div className="hidden lg:flex items-center gap-1">
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
                  'inline-flex items-center px-5 py-2 text-sm font-semibold rounded',
                  'bg-gold-400 text-navy-800 hover:bg-gold-300',
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
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded text-brick-600 hover:bg-brick-50 transition-colors"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
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
              className="fixed inset-0 z-40 bg-navy-900/50 backdrop-blur-sm lg:hidden"
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
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full bg-white shadow-xl lg:hidden overflow-y-auto"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <Logo theme="light" size="sm" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <div className="px-4 py-6 flex flex-col gap-1">
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
              <div className="px-6 pb-8 mt-2">
                <Link
                  to={navigation.cta.href}
                  className="block w-full text-center py-3 px-6 bg-gold-400 text-navy-800 text-sm font-semibold rounded hover:bg-gold-300 border border-gold-500 transition-colors"
                >
                  {navigation.cta.label}
                </Link>
              </div>

              {/* Contact in drawer */}
              <div className="px-6 py-4 mt-auto border-t border-slate-100">
                <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-navy-700">
                  <Phone size={14} aria-hidden="true" />
                  {companyInfo.phone}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
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
  const hasChildren = link.children && link.children.length > 0;

  if (!hasChildren) {
    return (
      <Link
        to={link.href}
        className={cn(
          'px-3 py-2 text-sm font-medium rounded transition-colors duration-150',
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
          'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded transition-colors duration-150',
          isActive || isDropdownOpen
            ? 'text-brick-600 bg-brick-50 font-semibold'
            : 'text-slate-700 hover:text-brick-600 hover:bg-brick-50'
        )}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        {link.label}
        <ChevronDown
          size={14}
          className={cn('transition-transform duration-200', isDropdownOpen && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded border border-brick-100 shadow-lg py-2 z-50"
            role="menu"
          >
            {link.children?.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                className="block px-4 py-2.5 text-sm text-slate-700 hover:text-brick-600 hover:bg-brick-50 transition-colors"
                role="menuitem"
              >
                {child.label}
              </Link>
            ))}
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
  const hasChildren = link.children && link.children.length > 0;
  const isOpen = activeDropdown === link.label;

  if (!hasChildren) {
    return (
      <Link
        to={link.href}
        className={cn(
          'block px-4 py-3 text-sm font-medium rounded transition-colors',
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
          'w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded transition-colors',
          isActive || isOpen
            ? 'text-brick-600 bg-brick-50 font-semibold'
            : 'text-slate-700 hover:text-brick-600 hover:bg-brick-50'
        )}
        aria-expanded={isOpen}
      >
        {link.label}
        <ChevronDown
          size={14}
          className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
          aria-hidden="true"
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
            <div className="ml-4 pl-4 border-l-2 border-brick-200 py-1 flex flex-col gap-0.5">
              {link.children?.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  className="block px-3 py-2.5 text-sm text-slate-600 hover:text-brick-600 hover:bg-brick-50 rounded transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
