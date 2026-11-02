/**
 * NotFound Page
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { Container } from '@/components/Container/Container';
import { Button } from '@/components/Button/Button';

export function NotFound() {
  useSEO({
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    noIndex: true,
  });

  return (
    <div className="min-h-[70vh] flex items-center bg-offwhite pt-24">
      <Container size="md" className="text-center flex flex-col items-center">
        <span className="font-mono text-9xl font-bold text-slate-200 leading-none mb-6">404</span>
        <h1 className="font-display font-bold text-3xl text-navy-700 mb-4">Page Not Found</h1>
        <p className="text-slate-600 mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button as="a" href="/" leftIcon={<ArrowLeft size={16} />}>
          Return to Homepage
        </Button>
      </Container>
    </div>
  );
}
