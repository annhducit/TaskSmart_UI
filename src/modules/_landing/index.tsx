import { lazy } from 'react';
import { createRouters } from '@/shared/router/utils';
import { useRoutes } from 'react-router-dom';

/**
 * Landing Pages
 */

const Index = lazy(() => import('./page/landing-page'));

const landingRoutes = createRouters([
  {
    index: true,
    element: <Index />,
  },
]);

const LandingFeature = () => {
  return useRoutes(landingRoutes);
};

export default LandingFeature;
