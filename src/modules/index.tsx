import { Navigate, useRoutes } from 'react-router-dom';
import { lazy } from 'react';

import { createRouters } from '@/shared/router/utils';
import LandingLayout from '@/modules/_layouts/LandingLayout';
import AuthenticateLayout from '@/modules/_layouts/AuthenticateLayout';
import Authenticated from '@/shared/components/auth/authenticated';
import AuthNavigate from '@/shared/components/auth/auth-navigate';
import DashboardLayout from './_layouts/DashboardLayout';
import UserInformation from '@/shared/components/auth/user-information';

const SignInFeature = lazy(() => import('@/modules/sign-in'));
const SignUpFeature = lazy(() => import('@/modules/sign-up'));
const LandingFeature = lazy(() => import('@/modules/_landing'));
const NotFoundFeature = lazy(() => import('@/modules/not-found'));

const PrivateRouter = lazy(() => import('@/modules/private'));

const routers = createRouters([
  {
    path: '/',
    element: <LandingLayout type='LANDING' />,
    children: [
      {
        index: true,
        element: <LandingFeature />,
      },
    ],
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: '*',
        element: (
          <Authenticated fallback={<AuthNavigate />}>
            <UserInformation>
              <PrivateRouter />
            </UserInformation>
          </Authenticated>
        ),
      },
    ],
  },

  {
    path: '/auth',
    element: <AuthenticateLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='sign-in' />,
      },
      {
        path: 'sign-up/*',
        element: <SignUpFeature />,
      },
      {
        path: 'sign-in/*',
        element: (
          <SignInFeature />
          // <Authenticated fallback={<SignInFeature />}>
          //   <SignInNavigate />
          // </Authenticated>
        ),
      },
    ],
  },
  {
    path: '/not-found',
    element: <LandingLayout type='NORMAL' />,
    children: [
      {
        index: true,
        element: <NotFoundFeature />,
      },
    ],
  },
]);

const AppRouter = () => {
  return useRoutes(routers);
};

export default AppRouter;
