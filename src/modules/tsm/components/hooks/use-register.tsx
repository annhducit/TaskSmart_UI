import { tsmAxios } from '@/configs/axios';
import { AuthType } from '@/modules/sign-up';
import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { useNavigate } from 'react-router-dom';

async function createAccount(data: AuthType) {
  const res = await tsmAxios.post<BaseResponseType<AuthType>>('/users', data);
  return res.data;
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
      if (res.statusCode === 201) {
        notification.success({
          message: 'Account created successfully',
        });
        navigate('/auth/sign-in');
      } else {
        notification.error({
          message: 'Cannot create account',
          description: res.statusCode,
        });
      }
    },
  });
}
