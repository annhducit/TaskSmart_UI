import { tsmAxios } from '@/configs/axios';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const removeUser = async (userId: string) => {
  const res = await tsmAxios.delete(`/users/${userId}`);
  return res;
};

const useRemoveUser = () => {
  return useMutation({
    mutationFn: removeUser,
    onSuccess: (data) => {
      if (isStatusCodeValid(data.status)) {
        toast.success('User removed successfully');
      } else {
        toast.error('Failed to remove user');
      }
    },
  });
};

export default useRemoveUser;
