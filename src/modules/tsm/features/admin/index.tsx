import { createRouters } from '@/shared/router/utils';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const DashboardFeature = lazy(() => import('./pages'));
const TemplateFeature = lazy(() => import('./pages/templates'));
const CreateTemplateFeature = lazy(() => import('./pages/templates/create'));
const TemplateDetailFeature = lazy(() => import('../templates/pages/details'));
const AccountFeature = lazy(() => import('./pages/accounts'));
const CategoryFeature = lazy(() => import('./pages/categories'));

const adminRoutes = createRouters([
  {
    path: '/dashboard',
    element: <DashboardFeature />,
  },
  {
    path: '/template/*',
    element: <TemplateFeature />,
  },
  {
    path: '/create/template',
    element: <CreateTemplateFeature />,
  },
  {
    path: '/template-detail/:templateId',
    element: <TemplateDetailFeature />,
  },
  {
    path: '/account/*',
    element: <AccountFeature />,
  },
  {
    path: '/category/*',
    element: <CategoryFeature />,
  },
]);

export default function AdminModule() {
  return useRoutes(adminRoutes);
}
