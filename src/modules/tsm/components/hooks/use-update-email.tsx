import { tsmAxios } from '@/configs/axios';
import type { AuthType } from '@/modules/sign-up';
import { useMutation } from '@tanstack/react-query';
import { useInvalidateProfile } from './use-profile';
import { toast } from 'sonner';
import { isStatusCodeValid } from '@/shared/components/status';
import { useDialogContext } from '@/shared/components/dialog/provider';

const updateEmail = async (payload: Partial<AuthType>) => {
  const { email, verifyCode } = payload;
  const data = await tsmAxios.patch('/users/email', { email, verifyCode });
  return data;
};

const useUpdateEmail = () => {
  const invalidateProfile = useInvalidateProfile();
  const { onClose } = useDialogContext();
  return useMutation({
    mutationFn: updateEmail,
    onSuccess: (data) => {
      if (isStatusCodeValid(data.status)) {
        invalidateProfile();
        onClose();
        toast.success('Update email success');
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useUpdateEmail;
