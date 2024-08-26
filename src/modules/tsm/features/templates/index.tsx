import { createRouters } from '@/shared/router/utils';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const Index = lazy(() => import('./pages'));
const TemplateDetail = lazy(() => import('./pages/details'));
const TemplateRoute = createRouters([
  {
    index: true,
    element: <Index />,
  },

  {
    path: '/:templateId',
    element: <TemplateDetail />,
  },
  /**
   * Add more routes here
   */
]);

export default function TemplateModule() {
  return useRoutes(TemplateRoute);
}
