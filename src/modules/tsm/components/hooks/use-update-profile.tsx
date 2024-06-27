import { tsmAxios } from '@/configs/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateProfile } from './use-profile';
import { isStatusCodeValid } from '@/shared/components/status';
import { useDialogContext } from '@/shared/components/dialog/provider';

const updateProfile = async (profile: Partial<UserData>) => {
  const data = await tsmAxios.put(`/users`, profile);
  return data;
};

const useUpdateProfile = () => {
  const invalidateProfile = useInvalidateProfile();
  const { onClose } = useDialogContext();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      if (isStatusCodeValid(data.status)) {
        toast.success('Profile updated successfully');
        onClose();
        invalidateProfile();
      }
    },
    onError: () => {
      toast.error('Username already exists');
    },
  });
};

export default useUpdateProfile;
