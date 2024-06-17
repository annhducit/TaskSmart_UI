import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import Loading from '../loading';
import { useAppDispatch } from '@/shared/hooks/use-redux';
import useUnAuthorized from '@/shared/hooks/use-un-authorized';
import { queryClient } from '@/configs/query-client';
import cookieUtils from '@/utils/cookieUtil';
import { useSelector } from '@/store';
import { getUserInformationAction } from '@/store/user/action';
import { clearInformation } from '@/store/user';
import { tsmAxios } from '@/configs/axios';
import { UNAUTHORIZED_CODE } from '@/shared/constant/response-code';

const UserInformation = (props: PropsWithChildren) => {
  const { children } = props;
  const dispatch = useAppDispatch();
  const unAuthorized = useUnAuthorized();
  const userId = useSelector((store) => store.user.data.id);
  const userIsLoaded = useSelector((store) => store.user.isLoaded);

  const accessToken = cookieUtils.getCookie('access_token');
  /**
   * Effect xử lý gắn accessToken cho axios
   */
  useEffect(() => {
    if (accessToken) {
      setTSMAxiosToken(accessToken);
    }

    /**
     * Xóa token khi đăng xuất
     */
    return () => {
      setTSMAxiosToken();
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

const setTSMAxiosToken = (accessToken?: string) => {
  tsmAxios.defaults.headers.common['Authorization'] = !accessToken ? null : `Bearer ${accessToken}`;
};
