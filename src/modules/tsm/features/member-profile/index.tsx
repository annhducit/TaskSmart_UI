import { createRouters } from '@/shared/router/utils';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const Index = lazy(() => import('./page'));
const ProfileRouter = createRouters([
  {
    index: true,
    element: <Index />,
  },
  /**
   * Add more routes here
   */
]);

export default function MailModule() {
  return useRoutes(ProfileRouter);
}
