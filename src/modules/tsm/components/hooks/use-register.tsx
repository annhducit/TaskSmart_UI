import { tsmAxios } from '@/configs/axios';
import type { AuthType } from '@/modules/sign-up';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import type { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

async function createAccount(data: AuthType) {
  const res = await tsmAxios.post<AxiosResponse<AuthType>>('/users', data);
  return res;
}
export function useRegister() {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  return useMutation({
    async mutationFn(data: AuthType) {
      const res = await createAccount(data);
      return res;
    },
    onSuccess(res) {
      if (isStatusCodeValid(res.status)) {
        notification.success({
          message: 'Account created successfully',
        });
        navigate('/auth/sign-in');
      } else {
        notification.error({
          message: 'Cannot create account',
          description: res.status,
        });
      }
    },
  });
}
