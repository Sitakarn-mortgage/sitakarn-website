/**
 * FAQAccordion Component
 * Plain divided list. Question + bare plus/minus; no numbering, no chips.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import type { FAQItem } from '@/types';

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItemComponent({ item, isOpen, onToggle }: FAQItemProps) {
  const id = `faq-answer-${item.id}`;
  const triggerId = `faq-trigger-${item.id}`;

  return (
    <div>
      <h3>
        <button
          id={triggerId}
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 py-5 text-left min-h-[52px]"
          aria-expanded={isOpen}
          aria-controls={id}
        >
          <span
            className={cn(
              'font-body font-medium text-base leading-snug',
              isOpen ? 'text-brick-600' : 'text-navy-700'
            )}
          >
            {item.question}
          </span>
          <AppIcon
            name={isOpen ? 'Minus' : 'Plus'}
            size={20}
            weight="regular"
            className={isOpen ? 'text-brick-600' : 'text-slate-500'}
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={id}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="text-base text-slate-600 leading-relaxed pb-6 max-w-prose">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={cn('divide-y divide-slate-200 border-y border-slate-200', className)}>
      {items.map((item) => (
        <FAQItemComponent
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
        />
      ))}
    </div>
  );
}
