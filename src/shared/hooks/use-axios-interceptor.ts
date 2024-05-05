import { get } from 'lodash';
import { useCallback } from 'react';
import useUnAuthorized from './use-un-authorized';
import { UNKNOWN_ERROR } from '../constant/text';
import { BAD_REQUEST_CODE, UNAUTHORIZED_CODE } from '../constant/response-code';

const useAxiosInterceptor = () => {
  const unAuthorized = useUnAuthorized();

  const onError = useCallback(
    async (error: any) => {
      switch (get(error, 'response.status')) {
        case UNAUTHORIZED_CODE:
          await unAuthorized();
          return;
        case BAD_REQUEST_CODE:
          throw new Error(get(error, 'response.data.message', UNKNOWN_ERROR));
      }
      return Promise.reject(error);
    },
    [unAuthorized]
  );

  return { onError };
};

export default useAxiosInterceptor;
