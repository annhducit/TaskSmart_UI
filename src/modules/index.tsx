import { Navigate, useRoutes } from 'react-router-dom';
import { lazy } from 'react';

import { createRouters } from '@/shared/router/utils';
import LandingLayout from '@/modules/_layouts/LandingLayout';
import AuthenticateLayout from '@/modules/_layouts/AuthenticateLayout';
import Authenticated from '@/shared/components/auth/authenticated';
import AuthNavigate from '@/shared/components/auth/auth-navigate';
import DashboardLayout from './_layouts/DashboardLayout';
import UserInformation from '@/shared/components/auth/user-information';
import SignInNavigate from '@/shared/components/auth/signin-navigate';
import AdminLayout from './_layouts/AdminLayout';
import { OAuthGitHubCallBack, OAuthGoogleCallBack } from './_layouts/OAuthCallback';

const SignInFeature = lazy(() => import('@/modules/sign-in'));
const SignUpFeature = lazy(() => import('@/modules/sign-up'));
const LandingFeature = lazy(() => import('@/modules/_landing'));
const NotFoundFeature = lazy(() => import('@/modules/not-found'));

const PrivateRouter = lazy(() => import('@/modules/private'));
const AdminRouter = lazy(() => import('@/modules/tsm/features/admin'));

const routers = createRouters([
  {
    path: '/',
    element: <LandingLayout type='LANDING' />,
    children: [
      {
        index: true,
        element: (
          <UserInformation>
            <LandingFeature />
          </UserInformation>
        ),
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
              {/* <CheckRole> */}
              <PrivateRouter />
              {/* </CheckRole> */}
            </UserInformation>
          </Authenticated>
        ),
      },
    ],
  },
  {
    path: '/admin/*',
    element: <AdminLayout />,
    children: [
      {
        path: '*',
        element: (
          <Authenticated fallback={<AuthNavigate />}>
            <UserInformation>
              <AdminRouter />
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
          <Authenticated fallback={<SignInFeature />}>
            <SignInNavigate />
          </Authenticated>
        ),
      },
      {
        path: 'oauth/google/callback',
        element: <OAuthGoogleCallBack />,
      },
      {
        path: 'oauth/github/callback',
        element: <OAuthGitHubCallBack />,
      },
    ],
  },
  {
    path: '/not-found',
    element: <LandingLayout type='NORMAL' />,
    children: [
      {
        index: true,
        element: (
          <UserInformation>
            <NotFoundFeature />
          </UserInformation>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return useRoutes(routers);
};

export default AppRouter;
