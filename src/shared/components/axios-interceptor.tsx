import { tsmAxios } from '@/configs/axios';
import { useEffect, useState, type PropsWithChildren } from 'react';
import useAxiosInterceptor from '../hooks/use-axios-interceptor';
import { axiosSuccessResponse } from './utils/axios';

const AxiosInterceptor = (props: PropsWithChildren) => {
  const { children } = props;
  const [isSet, setIsSet] = useState(false);
  const { onError } = useAxiosInterceptor();

  useEffect(() => {
    const nppInterceptor = tsmAxios.interceptors.response.use(axiosSuccessResponse, onError);
    setIsSet(true);

    return () => {
      tsmAxios.interceptors.response.eject(nppInterceptor);
      setIsSet(false);
    };
  }, [onError]);

  if (!isSet) {
    return null;
  }

  return children;
};

export default AxiosInterceptor;
