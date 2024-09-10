import { useSelector } from '@/stores';
import { type FC, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

const Authenticated: FC<Props> = (props) => {
  const { children, fallback } = props;
  const accessToken = useSelector((store) => store.auth?.data?.accessToken);

  if (!accessToken) {
    return fallback;
  }

  return children;
};

export default Authenticated;
