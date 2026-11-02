/**
 * Insights Listing Page
 * Features thought leadership, regulatory analysis, and research publications.
 * Supports category filtering and direct navigation to detailed articles.
 */

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useSEO } from '@/hooks/useSEO';
import { BlogAPI } from '@/api/blog';
import { blogData } from '@/data/blog';
import { images } from '@/assets/images';
import { PageHero } from '@/components/PageHero/PageHero';
import { InsightCard } from '@/components/InsightCard/InsightCard';
import { Container } from '@/components/Container/Container';
import { SectionWrapper } from '@/components/SectionWrapper/SectionWrapper';
import { Button } from '@/components/Button/Button';
import { staggerContainer } from '@/theme/animations';

export function Insights() {
  useSEO({
    title: 'Insights & Perspectives',
    description:
      "Regulatory updates, cooperative finance best practices, tax guides, and real estate due diligence analysis from Sitakarn advisors.",
    ogImage: images.hero.insights,
  });

  const { data: blogRes } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: BlogAPI.getAll,
    placeholderData: { data: blogData, success: true, timestamp: '' },
  });

  const posts = blogRes?.data ?? blogData;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Derive unique categories from available posts
  const categories = useMemo(() => {
    const catMap = new Map<string, string>();
    posts.forEach((p) => {
      if (p.category && p.categoryLabel) {
        catMap.set(p.category, p.categoryLabel);
      }
    });

    return [
      { key: 'all', label: 'All' },
      ...Array.from(catMap.entries()).map(([key, label]) => ({
        key,
        label,
      })),
    ];
  }, [posts]);

  // Filter posts based on active category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') return posts;
    return posts.filter((p) => p.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <>
      {/* ─── Hero Header ──────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="Resources & Insights"
        title="Perspectives & Regulatory Analysis"
        description="In-depth guidance on Nepal's cooperative regulations, NFRS accounting standards, tax compliance, and structured real estate due diligence."
        imageUrl={images.hero.insights}
        imageAlt="Sitakarn Insights and Research"
      />

      {/* ─── Filter & Article Grid ────────────────────────────────────────────── */}
      <SectionWrapper padding="lg" background="offwhite">
        <Container size="2xl">
          {/* Category Filter Bar + Article Count */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={cn(
                      'font-mono text-xs uppercase tracking-wider px-4 py-2 rounded transition-all cursor-pointer',
                      isActive
                        ? 'bg-brick-600 text-white shadow-sm font-semibold'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-brick-300 hover:text-brick-600'
                    )}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">
                Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
              </span>
            </div>
          </div>

          {/* Posts Grid */}
          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              <motion.div
                key={selectedCategory}
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post) => (
                  <InsightCard key={post.id} post={post} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-white rounded border border-slate-200 p-8 max-w-md mx-auto">
                <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-4 stroke-1" aria-hidden="true" />
                <h3 className="font-display text-lg text-navy-700 font-semibold mb-2">
                  No articles found
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  There are currently no published articles in this category.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-brick-600 hover:text-brick-700 font-semibold"
                >
                  View all articles <ArrowRight size={12} />
                </button>
              </div>
            )}
          </AnimatePresence>
        </Container>
      </SectionWrapper>

      {/* ─── Bottom Editorial Consultation CTA ─────────────────────────────────── */}
      <SectionWrapper padding="md" background="navy" className="relative overflow-hidden">
        {/* Brand-compliant Deep brick-to-navy gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-brick-700 via-brick-600 to-navy-700 opacity-95"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_rgba(212,117,117,0.3)_0%,_transparent_60%)]"
          aria-hidden="true"
        />
        {/* Top brick accent hairline */}
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brick-500 via-brick-400 to-brick-500 z-10"
          aria-hidden="true"
        />

        <Container className="relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Need Tailored Technical or Regulatory Guidance?
          </h2>
          <p className="text-white/75 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Our advisory team assists SACCOs, institutional leaders, and property buyers across Nepal in navigating regulatory compliance, auditing standards, and land verification.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              as="a"
              href="/contact"
              size="lg"
              className="bg-white text-brick-700 hover:bg-brick-50 border border-white/30 font-semibold shadow-md"
            >
              Book a Consultation
            </Button>
            <Button
              as="a"
              href="/services"
              size="lg"
              className="bg-white/15 text-white hover:bg-white/25 border border-white/30 backdrop-blur-sm"
            >
              Explore Services
            </Button>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
