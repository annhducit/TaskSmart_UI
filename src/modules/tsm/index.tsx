import { createRouters } from '@/shared/router/utils';
import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import ViewDoc from './features/workspace/components/project/components';

/**
 * Modules
 * @author Duc Nguyen
 */

const MailFeature = lazy(() => import('./features/mail'));
const WorkspaceDetailFeature = lazy(() => import('./features/workspace'));
const WorkspaceFeature = lazy(() => import('./features/workspace/page/workspace'));
const ProfileMember = lazy(() => import('./features/member-profile'));
const TemplateFeature = lazy(() => import('./features/templates'));
const InviteFeature = lazy(() => import('./features/invite'));

const tsmRoutes = createRouters([
  {
    index: true,
    element: <Navigate replace to='home' />,
  },
  {
    path: 'home/*',
    element: <WorkspaceFeature />,
  },
  {
    path: 'mail/*',
    element: <MailFeature />,
  },
  {
    path: 'invite/*',
    element: <InviteFeature />,
  },

  {
    path: 'profile/:memberId/*',
    element: <ProfileMember />,
  },
  {
    path: 'template/*',
    element: <TemplateFeature />,
  },

  {
    path: 'workspaces/:workspaceId/*',
    element: <WorkspaceFeature />,
  },
  {
    path: 'workspace/:workspaceId/*',
    element: <WorkspaceDetailFeature />,
  },
  {
    path: 'source/doc/:projectId/*',
    element: <ViewDoc />,
  },
  {
    path: 'project/:projectId/*',
    element: <></>,
  },
]);

export default function TSMModule() {
  return useRoutes(tsmRoutes);
}
