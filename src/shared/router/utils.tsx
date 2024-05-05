import { Navigate, type RouteObject } from 'react-router-dom';

const notFoundRouter: RouteObject = {
  path: '*',
  element: <Navigate to='/404' />,
};

export function createRouters(router: RouteObject[]) {
  return [...router, notFoundRouter];
}
