/**
 * InsightCard Component
 * Article preview. Bordered card is appropriate here: it is a distinct, clickable object.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { staggerItem } from '@/theme/animations';
import { formatDateShort, formatReadingTime } from '@/utils/format';
import { Badge } from '@/components/Badge/Badge';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import type { BlogPost } from '@/types';

interface InsightCardProps {
  post: BlogPost;
  className?: string;
}

export function InsightCard({ post, className }: InsightCardProps) {
  return (
    <motion.article
      variants={staggerItem}
      className={cn('group flex flex-col border border-slate-200 bg-white rounded overflow-hidden', className)}
    >
      <Link
        to={`/insights/${post.slug}`}
        className="relative block overflow-hidden aspect-[16/9] bg-slate-100"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={post.imageUrl} alt="" className="size-full object-cover" loading="lazy" />
        <div className="absolute top-3 left-3">
          <Badge variant="teal">{post.categoryLabel}</Badge>
        </div>
      </Link>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span>{formatDateShort(post.publishedAt)}</span>
          <span className="flex items-center gap-1.5">
            <AppIcon name="Clock" size={14} weight="regular" />
            {formatReadingTime(post.readingTime)}
          </span>
        </div>

        <h3 className="font-display font-semibold text-navy-700 text-lg leading-snug line-clamp-2 group-hover:text-brick-600 transition-colors">
          <Link to={`/insights/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>

        <div className="flex items-center justify-between pt-3 mt-auto border-t border-slate-100">
          <span className="text-sm text-slate-500 truncate pr-2">{post.author}</span>
          <Link
            to={`/insights/${post.slug}`}
            className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium text-brick-600 hover:text-brick-700 shrink-0"
            aria-label={`Read ${post.title}`}
          >
            Read article
            <AppIcon name="ArrowRight" size={14} weight="bold" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
