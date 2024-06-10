import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import Loading from '../loading';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-redux';
import useUnAuthorized from '@/shared/hooks/use-un-authorized';
import { useSelector } from 'react-redux';
import { setNPPAxiosToken } from '../utils/axios';
import { queryClient } from '@/configs/query-client';

const UNAUTHORIZED_CODE = 401;
const UserInformation = (props: PropsWithChildren) => {
  const { children } = props;
  const dispatch = useAppDispatch();
  const unAuthorized = useUnAuthorized();
  const accessToken = useAppSelector((store) => store.auth.data.accessToken);
  const userId = useSelector((store) => store.user.data.user.id);
  const userIsLoaded = useSelector((store) => store.user.isLoaded);

  /**
   * Effect xử lý gắn accessToken cho axios
   */
  useEffect(() => {
    if (accessToken) {
      setNPPAxiosToken(accessToken);
    }

    /**
     * Xóa token khi đăng xuất
     */
    return () => {
      setNPPAxiosToken();
    };
  }, [accessToken]);

  /**
   * Xóa khi đăng xuất
   */
  useEffect(() => {
    return () => {
      queryClient.clear();
    };
  }, []);

  useEffect(() => {
    if (!userId) {
      const getUserInfo = async () => {
        try {
          /**
           * Lấy thông tin người dùng
           */
          const userInfo = await dispatch(getUserInformationAction());

          if (userInfo.payload !== UNAUTHORIZED_CODE) {
            return;
          }

          /**
           * Xử lý khi accessToken UNAUTHORIZED
           */
          unAuthorized();
        } catch (error) {
          console.log(error);
        }
      };

      getUserInfo();
    }

    /**
     * Xóa khi đăng xuất
     */
    return () => {
      userId && dispatch(clearInformation());
    };
  }, [userId, unAuthorized, dispatch]);

  if (!userIsLoaded) {
    return <Loading.Page />;
  }

  return children;
};

export default UserInformation;
