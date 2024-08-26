import { createRouters } from '@/shared/router/utils';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

/**
 * Pages
 */
const Index = lazy(() => import('./page'));

const HomeRoutes = createRouters([
  {
    index: true,
    element: <Index />,
  },
]);

const HomeFeature = () => {
  return useRoutes(HomeRoutes);
};

export default HomeFeature;
