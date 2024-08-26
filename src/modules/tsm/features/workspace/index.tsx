import { createRouters } from '@/shared/router/utils';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const WorkspaceDetail = lazy(() => import('./page/workspace-detail'));

const workspaceDetailRoutes = createRouters([
  {
    path: '/',
    element: <WorkspaceDetail />,
  },
]);

export const WorkspaceDetailFeature = () => {
  return useRoutes(workspaceDetailRoutes);
};

export default WorkspaceDetailFeature;
