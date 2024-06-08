import { createRouters } from '@/shared/router/utils';
import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

/**
 * Modules
 * @author Duc Nguyen
 */

const HomeFeature = lazy(() => import('./features/home'));
const MailFeature = lazy(() => import('./features/mail'));
const WorkspaceDetailFeature = lazy(() => import('./features/workspace'));
const WorkspaceFeature = lazy(() => import('./features/workspace/page/workspace'));
const ProfileMember = lazy(() => import('./features/member-profile'));

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
    path: 'profile/:memberId/*',
    element: <ProfileMember />,
  },
  {
    path: 'workspace/*',
    element: <WorkspaceFeature />,
  },
  {
    path: 'workspace/:workspaceId/*',
    element: <WorkspaceDetailFeature />,
  },
  /**
   * Add more routes here
   */
]);

export default function TSMModule() {
  return useRoutes(tsmRoutes);
}
