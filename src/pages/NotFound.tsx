/**
 * NotFound Page
 * Branded 404 fallback page using AppIcon and Button SPA routing.
 */

import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Container } from '@/components/Container/Container';
import { Button } from '@/components/Button/Button';
import { AppIcon } from '@/components/AppIcon/AppIcon';
import { Divider } from '@/components/Divider/Divider';

export function NotFound() {
  useSEO({
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    noIndex: true,
  });

  return (
    <div className="min-h-[70vh] flex items-center bg-offwhite py-20">
      <Container size="md" className="text-center flex flex-col items-center">
        <Divider className="mx-auto mb-5" />
        <span className="font-mono text-7xl sm:text-8xl font-bold text-brick-600/20 leading-none mb-4">
          404
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-navy-700 mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-600 mb-8 max-w-md text-sm sm:text-base leading-relaxed">
          The page or resource you requested might have been moved, updated, or is temporarily unavailable.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            as="a"
            href="/"
            leftIcon={<AppIcon name="ArrowLeft" size={16} weight="bold" />}
          >
            Return to Homepage
          </Button>
          <Button as="a" href="/services" variant="outline">
            Explore Services
          </Button>
        </div>
      </Container>
    </div>
  );
}
