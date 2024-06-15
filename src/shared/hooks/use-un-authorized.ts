import { useDispatch } from '@/store';
import { reSignInAction } from '@/store/auth/action';
import { useCallback } from 'react';
import { UNAUTHORIZED_CODE } from '../constant/response-code';
import { clearAuthentication } from '@/store/auth';
import cookieUtil from '@/utils/cookieUtil';

const useUnAuthorized = () => {
  const dispatch = useDispatch();
  const refreshToken = cookieUtil.getCookie('refresh_token');

  const unAuthorized = useCallback(async () => {
    if (refreshToken) {
      const reSignIn = await dispatch(reSignInAction());
      if (reSignIn.payload !== UNAUTHORIZED_CODE) {
        return;
      }
    }
    dispatch(clearAuthentication());
  }, [dispatch, refreshToken]);

  return () => unAuthorized();
};

export default useUnAuthorized;
