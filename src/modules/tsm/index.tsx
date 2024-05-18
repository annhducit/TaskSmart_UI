import { createRouters } from '@/shared/router/utils';
import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

/**
 * Modules
 * @author Duc Nguyen
 */

const HomeFeature = lazy(() => import('./features/home'));
const MailFeature = lazy(() => import('./features/mail'));
const ProjectFeature = lazy(() => import('./features/project'));

const tsmRoutes = createRouters([
  {
    index: true,
    element: <Navigate replace to='home' />,
  },
  {
    path: 'home/*',
    element: <HomeFeature />,
  },
  {
    path: 'mail/*',
    element: <MailFeature />,
  },
  {
    path: 'project/*',
    element: <ProjectFeature />,
  },
  /**
   * Add more routes here
   */
]);

export default function TSMModule() {
  return useRoutes(tsmRoutes);
}
