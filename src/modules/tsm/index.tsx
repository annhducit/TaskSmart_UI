import { createRouters } from '@/shared/router/utils';
import { Navigate, useRoutes } from 'react-router-dom';

/**
 * Modules
 * @author Duc Nguyen
 */
const tsmRoutes = createRouters([
  {
    index: true,
    element: <Navigate replace to='home' />,
  },
  {
    path: 'home',
    element: <div>Home Page</div>,
  },
  /**
   * Add more routes here
   */
]);

export default function TSMModule() {
  return useRoutes(tsmRoutes);
}
