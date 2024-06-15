import { tsmAxios } from '@/configs/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

async function verifyEmail(email: string) {
  const res = await tsmAxios.post<BaseResponseType<string>>(`verify?email=${email}`);
  return res;
}
export function useVerifyEmail() {
  return useMutation({
    async mutationFn(email: string) {
      const data = await verifyEmail(email);
      return data;
    },
    onSuccess: (data) => {
      if (data.status === 201) {
        toast.success('Email verified successfully');
      } else {
        toast.error('Email verification failed');
      }
    },
  });
}
