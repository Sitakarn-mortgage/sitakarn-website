/**
 * TeamCard Component
 * Displays a team member with photo, name, title, bio, qualifications, and contact links.
 * Clean, restrained layout adhering strictly to the baseline UI principles.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { staggerItem } from '@/theme/animations';
import { getInitials } from '@/utils/format';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import type { TeamMember } from '@/types';

export interface TeamCardProps {
  member: TeamMember;
  variant?: 'leadership' | 'consultant';
  /** Used by leadership variant to alternate layout direction & colour */
  index?: number;
  className?: string;
}

/**
 * Formats a qualification string cleanly without cutting multi-word degrees
 * down to a single generic word like "Master" or "Bachelor".
 */
function formatQualification(q: string): string {
  const trimmed = q.trim();
  const parenMatch = trimmed.match(/\(([^)]+)\)/);
  if (parenMatch && parenMatch[1].length <= 14 && trimmed.length > 28) {
    return parenMatch[1];
  }
  if (trimmed.length <= 30) {
    return trimmed;
  }
  return `${trimmed.slice(0, 28)}…`;
}

export function TeamCard({
  member,
  variant = 'consultant',
  index = 0,
  className,
}: TeamCardProps) {
  const [imgError, setImgError] = useState(false);

  /* ── Leadership: full-bleed alternating row ─────────────────────────── */
  if (variant === 'leadership') {
    const isEven = index % 2 === 0;
    // Even rows: navy bg, image left. Odd rows: brick bg, image right.
    const bgClass = isEven ? 'bg-navy-700' : 'bg-brick-700';
    // Strict Gold Rule: on navy-700 use brick-200, on brick-700 use white/90 (never gold on navy)
    const titleColor = isEven ? 'text-brick-200' : 'text-white/90';

    return (
      <motion.article
        variants={staggerItem}
        className={cn(bgClass, 'relative overflow-hidden', className)}
      >
        <div
          className={cn(
            'flex min-h-[420px] md:min-h-[480px]',
            isEven ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse'
          )}
        >
          {/* Portrait — no gradient overlay */}
          <div className="relative w-full md:w-[43%] shrink-0 aspect-[4/3] md:aspect-auto overflow-hidden bg-navy-900">
            {!imgError ? (
              <img
                src={member.imageUrl}
                alt={`Portrait of ${member.name}`}
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="lazy"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-white/10">
                <span className="font-display text-5xl font-bold text-white/40">
                  {getInitials(member.name)}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center gap-5 px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-16 flex-1">
            {/* Department (text-sm text-white/70, no uppercase) */}
            <p className="text-sm text-white/70">
              {member.department}
            </p>

            {/* Name + title */}
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
                {member.name}
              </h2>
              <p className={cn('text-base sm:text-lg font-medium mt-1.5', titleColor)}>
                {member.title}
              </p>
            </div>

            {/* Bio */}
            {member.bio && (
              <p className="text-sm md:text-base leading-relaxed text-white/75 max-w-prose">
                {member.bio}
              </p>
            )}

            {/* Qualifications */}
            {member.qualifications && member.qualifications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {member.qualifications.map((q) => (
                  <span
                    key={q}
                    title={q}
                    className="border border-white/30 rounded px-3 py-1 text-xs text-white/85"
                  >
                    {formatQualification(q)}
                  </span>
                ))}
              </div>
            )}

            {/* Years of experience + bare icon links */}
            <div className="flex flex-wrap items-center gap-6 pt-3 mt-1 border-t border-white/15">
              {member.yearsOfExperience != null && (
                <span className="text-sm text-white/70">
                  {member.yearsOfExperience} years of experience
                </span>
              )}
              {(member.linkedin || member.email) && (
                <div className="flex items-center gap-1">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="size-11 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    >
                      <AppIcon name="LinkedinLogo" size={20} weight="regular" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="size-11 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    >
                      <AppIcon name="EnvelopeSimple" size={20} weight="regular" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  /* ── Consultant: clean column without box or shadow ─────────────────── */
  return (
    <motion.article
      variants={staggerItem}
      className={cn('flex flex-col gap-3', className)}
    >
      {/* Portrait */}
      <div className="aspect-[4/5] overflow-hidden rounded bg-slate-100">
        {!imgError ? (
          <img
            src={member.imageUrl}
            alt={`Portrait of ${member.name}`}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100">
            <span className="font-display text-3xl font-bold text-slate-400">
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 mt-1">
        <h3 className="font-display font-semibold text-navy-700 text-lg leading-snug">
          {member.name}
        </h3>
        <p className="text-slate-600 text-sm">
          {member.title}
        </p>
        <p className="text-sm text-slate-500">
          {member.department}
        </p>
      </div>

      {/* Qualifications */}
      {member.qualifications && member.qualifications.length > 0 && (
        <p className="text-xs text-slate-500 leading-relaxed">
          {member.qualifications.map((q, i) => (
            <span key={q} title={q}>
              {formatQualification(q)}
              {i < member.qualifications!.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      )}

      {/* Bare icon links */}
      {(member.linkedin || member.email) && (
        <div className="flex items-center gap-1 mt-auto pt-1">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="size-11 flex items-center justify-center text-slate-500 hover:text-navy-700 transition-colors"
            >
              <AppIcon name="LinkedinLogo" size={18} weight="regular" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="size-11 flex items-center justify-center text-slate-500 hover:text-brick-600 transition-colors"
            >
              <AppIcon name="EnvelopeSimple" size={18} weight="regular" />
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}
