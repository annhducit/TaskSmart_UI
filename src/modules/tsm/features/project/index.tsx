import { createRouters } from '@/shared/router/utils';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const Index = lazy(() => import('./page'));

const projectRoutes = createRouters([
  {
    index: true,
    element: <Index />,
  },
]);

export const ProjectFeature = () => {
  return useRoutes(projectRoutes);
};

export default ProjectFeature;
