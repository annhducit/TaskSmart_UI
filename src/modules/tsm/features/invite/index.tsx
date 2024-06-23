import { createRouters } from '@/shared/router/utils';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const Index = lazy(() => import('./page'));
const TemplateRoute = createRouters([
  {
    path: '/:projectId/:inviteCode',
    element: <Index />,
  },
  /**
   * Add more routes here
   */
]);

export default function TemplateModule() {
  return useRoutes(TemplateRoute);
}
