/**
 * Application Routes
 * Defines all routes and lazy loads components where appropriate.
 */

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Services } from '@/pages/Services';
import { Team } from '@/pages/Team';
import { Contact } from '@/pages/Contact';
import { Insights } from '@/pages/Insights';
import { InsightDetail } from '@/pages/InsightDetail';
import { NotFound } from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'team',
        element: <Team />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'insights',
        element: <Insights />,
      },
      {
        path: 'insights/:slug',
        element: <InsightDetail />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
