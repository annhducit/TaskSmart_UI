import { useDispatch, useSelector } from '@/store';
import { reSignInAction } from '@/store/auth/action';
import { useCallback } from 'react';
import { UNAUTHORIZED_CODE } from '../constant/response-code';
import { forceSignOut } from '@/store/auth';

const useUnAuthorized = () => {
  const dispatch = useDispatch();

  const refreshToken = useSelector((store) => store?.auth?.data?.refreshToken);

  const unAuthorized = useCallback(async () => {
    if (refreshToken) {
      const reSignIn = await dispatch(
        reSignInAction({
          refreshToken,
        })
      );
      if (reSignIn.payload !== UNAUTHORIZED_CODE) {
        return;
      }
    }

    dispatch(forceSignOut());
  }, [dispatch, refreshToken]);

  return unAuthorized;
};

export default useUnAuthorized;
