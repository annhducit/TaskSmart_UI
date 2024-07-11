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
    path: 'admin',
    element: <DashboardFeature />,
  },
  {
    path: 'admin/template/*',
    element: <TemplateFeature />,
  },
  {
    path: 'admin/create/template',
    element: <CreateTemplateFeature />,
  },
  {
    path: 'admin/template-detail/:templateId',
    element: <TemplateDetailFeature />,
  },
  {
    path: 'admin/account/*',
    element: <AccountFeature />,
  },
  {
    path: 'admin/category/*',
    element: <CategoryFeature />,
  },
]);

export default function AdminModule() {
  return useRoutes(adminRoutes);
}
