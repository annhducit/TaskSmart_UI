import { Navigate, type RouteObject } from 'react-router-dom';

const notFoundRouter: RouteObject = {
  path: '*',
  element: <Navigate to='/not-found' />,
};

export function createRouters(router: RouteObject[]) {
  return [...router, notFoundRouter];
}
