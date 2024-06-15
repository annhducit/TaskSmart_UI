import cookieUtil from '@/utils/cookieUtil';
import { type FC, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

const Authenticated: FC<Props> = (props) => {
  const { children, fallback } = props;
  const accessToken = cookieUtil.getCookie('access_token');
  console.log(accessToken);

  if (!accessToken) {
    return fallback;
  }

  return children;
};

export default Authenticated;
