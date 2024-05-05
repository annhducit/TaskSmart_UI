import { Navigate, useRoutes } from 'react-router-dom';
import { lazy } from 'react';

import { createRouters } from '@/shared/router/utils';
import LandingLayout from '@/modules/_layouts/LandingLayout';
import AuthenticateLayout from '@/modules/_layouts/AuthenticateLayout';
import AuthNavigate from '@/shared/components/auth/auth-navigate';
import Authenticated from '@/shared/components/auth/authenticated';
import SignInNavigate from '@/shared/components/auth/signin-navigate';
import NotFound from './not-found';

const SignInFeature = lazy(() => import('@/modules/sign-in'));
const SignUpFeature = lazy(() => import('@/modules/sign-up'));
const LandingPage = lazy(() => import('@/modules/_landing/page/landing-page'));

const routers = createRouters([
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: '404',
        element: <NotFound />,
      },
      {
        path: '*',
        element: (
          <Authenticated fallback={<AuthNavigate />}>
            {/* <UserInformation>
                              <PrivateRouter />
                          </UserInformation> */}
            <div></div>
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
    ],
  },
]);

const AppRouter = () => {
  return useRoutes(routers);
};

export default AppRouter;
