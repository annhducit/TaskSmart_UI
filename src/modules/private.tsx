import { createRouters } from '@/shared/router/utils';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const TSMModule = lazy(() => import('./tsm'));

const privateRouters = createRouters([
  {
    path: 'tsm/*',
    element: <TSMModule />,
  },
]);

export default function PrivateRouter() {
  return useRoutes(privateRouters);
}
