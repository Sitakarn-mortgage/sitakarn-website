/**
 * ServiceDetailDrawer Component
 * Right-hand panel on desktop, bottom sheet on mobile. Plain white surface:
 * description, included items as a simple list, audience as a simple list, one CTA.
 */

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Service } from '@/types';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import { Button } from '@/components/Button/Button';

export interface ServiceDetailDrawerProps {
  service: Service | null;
  categoryTitle?: string;
  onClose: () => void;
}

export function ServiceDetailDrawer({ service, categoryTitle, onClose }: ServiceDetailDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!service) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <>
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-navy-900/50"
            aria-hidden="true"
          />

          <motion.div
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-drawer-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed z-[70] inset-x-0 bottom-0 max-h-[88dvh] sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[34rem] sm:max-h-none flex flex-col bg-white rounded-t-lg sm:rounded-none shadow-xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-5 sm:px-8 border-b border-slate-200">
              <div className="flex flex-col gap-2 min-w-0">
                {categoryTitle && <p className="text-sm text-slate-500">{categoryTitle}</p>}
                <h2
                  id="service-drawer-title"
                  className="font-display text-2xl font-bold text-navy-700 leading-snug"
                >
                  {service.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close service details"
                className="size-11 -mr-2 -mt-1 flex items-center justify-center text-slate-500 hover:text-navy-700 transition-colors shrink-0"
              >
                <AppIcon name="X" size={22} weight="regular" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 flex flex-col gap-8">
              <p className="text-base text-slate-700 leading-relaxed">
                {service.fullDescription || service.shortDescription}
              </p>

              {service.features && service.features.length > 0 && (
                <section>
                  <h3 className="font-display text-lg font-semibold text-navy-700 mb-3">
                    What&apos;s included
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                        <AppIcon
                          name="Check"
                          size={18}
                          weight="bold"
                          className="text-brick-600 mt-0.5"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {service.targetAudience && service.targetAudience.length > 0 && (
                <section>
                  <h3 className="font-display text-lg font-semibold text-navy-700 mb-3">Who it&apos;s for</h3>
                  <ul className="flex flex-col gap-1.5 text-sm text-slate-700">
                    {service.targetAudience.map((audience) => (
                      <li key={audience}>{audience}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 sm:px-8 border-t border-slate-200 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
              <Button type="button" variant="ghost" onClick={onClose}>
                Close
              </Button>
              <Button
                as="a"
                href={`/contact?service=${service.categoryId}&topic=${encodeURIComponent(service.title)}`}
              >
                Ask about this service
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
