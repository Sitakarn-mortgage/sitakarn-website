/**
 * Insight Detail Page
 * Editorial article view presenting regulatory analysis and insights.
 * Uses AppIcon for all icons and includes dependency-free markdown rendering.
 */

import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/utils/cn';
import { useSEO } from '@/hooks/useSEO';
import { BlogAPI } from '@/api/blog';
import { blogData } from '@/data/blog';
import { formatDate, formatReadingTime } from '@/utils/format';
import { Badge } from '@/components/Badge/Badge';
import { Container } from '@/components/Container/Container';
import { SectionWrapper } from '@/components/SectionWrapper/SectionWrapper';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { Divider } from '@/components/Divider/Divider';
import { InsightCard } from '@/components/InsightCard/InsightCard';
import { AppIcon } from '@/components/AppIcon/AppIcon';

// ─── Inline Formatting Parser Helper ─────────────────────────────────────────

function renderInlineFormatting(text: string): React.ReactNode[] {
  const tokenRegex = /(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-navy-700"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          className="text-brick-600 underline hover:text-brick-700 transition-colors"
          target={linkMatch[2].startsWith('http') ? '_blank' : undefined}
          rel={linkMatch[2].startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {linkMatch[1]}
        </a>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-navy-700">
          {renderInlineFormatting(part.slice(2, -2))}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

// ─── Clean Dependency-Free Editorial Markdown Renderer ───────────────────────

function renderMarkdown(content: string): React.ReactNode {
  if (!content) return null;

  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      blocks.push(<hr key={`hr-${i}`} className="my-8 border-slate-200" />);
      i++;
      continue;
    }

    if (trimmed.startsWith('### ')) {
      const text = trimmed.slice(4).trim();
      blocks.push(
        <h3
          key={`h3-${i}`}
          className="font-display font-semibold text-xl text-navy-700 mt-8 mb-3"
        >
          {renderInlineFormatting(text)}
        </h3>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      const text = trimmed.slice(3).trim();
      blocks.push(
        <h2
          key={`h2-${i}`}
          className="font-display font-bold text-2xl md:text-3xl text-navy-700 mt-10 mb-4"
        >
          {renderInlineFormatting(text)}
        </h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push(
        <blockquote
          key={`bq-${i}`}
          className="border-l-4 border-brick-600 bg-offwhite pl-5 sm:pl-6 py-4 my-6 italic font-display text-slate-700 rounded-r-md"
        >
          {quoteLines.map((ql, qIdx) => (
            <p key={qIdx} className={cn('leading-relaxed', qIdx > 0 && 'mt-2')}>
              {renderInlineFormatting(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: { num: string; text: string }[] = [];
      while (i < lines.length) {
        const line = lines[i].trim();
        const match = line.match(/^(\d+)\.\s+(.*)$/);
        if (match) {
          items.push({ num: match[1], text: match[2] });
          i++;
        } else if (line === '') {
          const nextIndex = i + 1;
          if (nextIndex < lines.length && /^\d+\.\s+/.test(lines[nextIndex].trim())) {
            i++;
          } else {
            break;
          }
        } else {
          if (items.length > 0 && (lines[i].startsWith(' ') || lines[i].startsWith('\t'))) {
            items[items.length - 1].text += ' ' + line;
            i++;
          } else {
            break;
          }
        }
      }
      blocks.push(
        <ol key={`ol-${i}`} className="space-y-3 my-5 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-600 leading-relaxed text-base">
              <span className="shrink-0 font-mono text-xs font-semibold text-gold-700 bg-gold-50 border border-gold-200/80 rounded px-2 py-0.5 mt-0.5">
                {item.num}.
              </span>
              <div className="flex-1">{renderInlineFormatting(item.text)}</div>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    if (/^(\s*)[-*]\s+/.test(rawLine)) {
      const items: { text: string; indent: boolean }[] = [];
      while (i < lines.length) {
        const curRaw = lines[i];
        const match = curRaw.match(/^(\s*)([-*])\s+(.*)$/);
        if (match) {
          const indent = match[1].length >= 2;
          items.push({ text: match[3], indent });
          i++;
        } else if (curRaw.trim() === '') {
          const nextIndex = i + 1;
          if (nextIndex < lines.length && /^(\s*)[-*]\s+/.test(lines[nextIndex])) {
            i++;
          } else {
            break;
          }
        } else {
          if (items.length > 0 && (/^\s{2,}/.test(curRaw) || !curRaw.startsWith('#'))) {
            items[items.length - 1].text += ' ' + curRaw.trim();
            i++;
          } else {
            break;
          }
        }
      }
      blocks.push(
        <ul key={`ul-${i}`} className="space-y-2.5 my-5 pl-1">
          {items.map((item, idx) => (
            <li
              key={idx}
              className={cn(
                'flex items-start gap-3 text-slate-600 leading-relaxed text-base',
                item.indent && 'ml-6 md:ml-8 text-sm text-slate-600'
              )}
            >
              <span
                className={cn(
                  'rounded-full shrink-0 mt-2.5',
                  item.indent ? 'w-1.5 h-1.5 bg-brick-400' : 'w-2 h-2 bg-brick-600'
                )}
                aria-hidden="true"
              />
              <div className="flex-1">{renderInlineFormatting(item.text)}</div>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    const paraLines: string[] = [];
    while (i < lines.length) {
      const line = lines[i];
      const t = line.trim();
      if (!t) break;
      if (
        t.startsWith('## ') ||
        t.startsWith('### ') ||
        t.startsWith('>') ||
        t === '---' ||
        t === '***' ||
        /^\d+\.\s+/.test(t) ||
        /^(\s*)[-*]\s+/.test(line)
      ) {
        break;
      }
      paraLines.push(t);
      i++;
    }

    if (paraLines.length > 0) {
      const fullPara = paraLines.join(' ');
      blocks.push(
        <p key={`p-${i}`} className="text-slate-600 leading-relaxed text-base md:text-lg my-5">
          {renderInlineFormatting(fullPara)}
        </p>
      );
    }
  }

  return <div className="space-y-1">{blocks}</div>;
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function InsightDetail() {
  const { slug = '' } = useParams<{ slug: string }>();

  const { data: postRes, isLoading: postLoading } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => BlogAPI.getBySlug(slug),
    enabled: Boolean(slug),
  });

  const { data: allPostsRes } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: BlogAPI.getAll,
    placeholderData: { data: blogData, success: true, timestamp: '' },
  });

  const allPosts = allPostsRes?.data ?? blogData;
  const post = postRes?.data ?? (postLoading ? blogData.find((p) => p.slug === slug) ?? null : null);

  useSEO({
    title: post ? post.title : 'Article',
    description: post?.excerpt ?? 'Sitakarn Financial & Real Estate Insights',
    ogImage: post?.imageUrl,
    ogType: 'article',
  });

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    const others = allPosts.filter((p) => p.slug !== post.slug);
    const sameCategory = others.filter((p) => p.category === post.category);
    const differentCategory = others.filter((p) => p.category !== post.category);
    return [...sameCategory, ...differentCategory].slice(0, 3);
  }, [allPosts, post]);

  if (!post && !postLoading) {
    return (
      <SectionWrapper padding="xl" background="offwhite" className="min-h-[60vh] flex items-center">
        <Container size="md" className="text-center py-16">
          <Divider className="mx-auto mb-6" />
          <span className="eyebrow text-brick-600 block mb-2 font-mono text-xs uppercase tracking-widest">
            Notice
          </span>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-navy-700 mb-4">
            Article Not Found
          </h1>
          <p className="text-slate-600 max-w-md mx-auto mb-8 text-base">
            The perspective or regulatory analysis article you are looking for may have been moved, updated, or archived.
          </p>
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 bg-brick-600 text-white text-sm font-medium rounded hover:bg-brick-700 transition-colors shadow-xs"
          >
            <AppIcon name="ArrowLeft" size={16} weight="bold" /> Return to All Perspectives
          </Link>
        </Container>
      </SectionWrapper>
    );
  }

  if (!post) {
    return (
      <SectionWrapper padding="xl" background="offwhite" className="min-h-[60vh]">
        <Container size="md" className="py-24 text-center">
          <div className="w-8 h-8 border-2 border-brick-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-xs uppercase tracking-wider text-slate-500">Loading Perspective…</p>
        </Container>
      </SectionWrapper>
    );
  }

  return (
    <>
      {/* ─── Editorial Article Header ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-800 pt-16 pb-14 md:pt-20 md:pb-20">
        {post.imageUrl && (
          <div className="absolute inset-0 z-0 opacity-20" aria-hidden="true">
            <img src={post.imageUrl} alt="" className="size-full object-cover object-center" />
          </div>
        )}
        <div className="absolute top-0 left-0 right-0 h-1 bg-brick-600 z-10" aria-hidden="true" />

        <Container size="2xl" className="relative z-10">
          <div className="max-w-4xl">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brick-200 hover:text-white mb-6 transition-colors group"
            >
              <AppIcon
                name="ArrowLeft"
                size={14}
                weight="bold"
                className="group-hover:-translate-x-0.5 transition-transform"
              />
              Back to Insights
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-white/75 font-mono text-xs mb-4">
              <Badge variant="teal">{post.categoryLabel}</Badge>
              <span aria-hidden="true" className="text-white/40">·</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span aria-hidden="true" className="text-white/40">·</span>
              <span className="flex items-center gap-1">
                <AppIcon name="Clock" size={13} weight="regular" className="text-brick-300" />
                {formatReadingTime(post.readingTime)}
              </span>
              <span aria-hidden="true" className="text-white/40">·</span>
              <span>By {post.author}</span>
            </div>

            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-white leading-tight max-w-4xl">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-3xl mt-4">
              {post.excerpt}
            </p>
          </div>
        </Container>
      </section>

      {/* ─── Article Body Section ─────────────────────────────────────────────── */}
      <SectionWrapper padding="lg" background="white">
        <Container size="md">
          <div className="overflow-hidden rounded mb-10 sm:mb-12 aspect-[16/9] w-full bg-slate-100">
            <img src={post.imageUrl} alt={post.title} className="size-full object-cover" />
          </div>

          <article className="prose-clean">
            {renderMarkdown(post.body || post.excerpt)}
          </article>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-8 mt-12 border-t border-slate-200">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-2">
                Topic Tags:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-offwhite border border-slate-200 text-slate-600 font-mono text-xs px-3 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Need Tailored Advisory Callout */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-bold text-xl text-navy-700 mb-1">
                Need advice on this topic?
              </h2>
              <p className="text-slate-600 text-sm max-w-xl leading-relaxed">
                Our chartered accountants, legal advocates, and licensed real estate brokers can review your organization&apos;s specific requirements.
              </p>
            </div>
            <Link
              to={`/contact?topic=${encodeURIComponent(post.title)}`}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 bg-brick-600 text-white text-sm font-medium rounded hover:bg-brick-700 transition-colors shrink-0"
            >
              Talk to an advisor
            </Link>
          </div>
        </Container>
      </SectionWrapper>

      {/* ─── Related Perspectives Section ─────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <SectionWrapper padding="lg" background="offwhite" className="border-t border-slate-200/80">
          <Container size="2xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <SectionTitle eyebrow="Continue Reading" title="Related Perspectives" />
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brick-600 hover:text-brick-700 font-semibold group"
              >
                View All Perspectives
                <AppIcon
                  name="ArrowRight"
                  size={14}
                  weight="bold"
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((related) => (
                <InsightCard key={related.id} post={related} />
              ))}
            </div>
          </Container>
        </SectionWrapper>
      )}
    </>
  );
}
