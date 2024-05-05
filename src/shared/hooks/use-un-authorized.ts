// import { useCallback } from 'react';
// import { useDispatch, useSelector } from '~/store';
// import { forceSignOut } from '~/store/auth';
// import { reSignInAction } from '~/store/auth/action';
// import { UNAUTHORIZED_CODE } from '../constant/response-code';

const useUnAuthorized = () => {
  // const dispatch = useDispatch();
  // const refreshToken = useSelector((store) => store.auth.data.refreshToken);

  // const unAuthorized = useCallback(async () => {
  //   if (refreshToken) {
  //     const reSignIn = await dispatch(reSignInAction({ refreshToken, browserId: 'undefined' }));
  //     if (reSignIn.payload !== UNAUTHORIZED_CODE) {
  //       return;
  //     }
  //   }
  //   dispatch(forceSignOut());
  // }, [dispatch, refreshToken]);

  return () => {};
};

export default useUnAuthorized;
