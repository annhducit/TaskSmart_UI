import { tsmAxios } from '@/configs/axios';
import { isStatusCodeValid } from '@/shared/components/status';
import useLocalStorage from '@/shared/hooks/use-local-storage';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const useGetInviteProject = (payload: { isPublic: boolean; refresh: boolean }) => {
  const { isPublic, refresh } = payload;
  const [value] = useLocalStorage('project_id', '');

  const useMutationHook = useMutation({
    mutationFn: async () => {
      const query = `?isPublic=${isPublic}&refresh=${refresh}`;

      const data = await tsmAxios.patch(`/projects/invite/${value}${query}`);
      return data;
    },
    onSuccess(data, _variables, _context) {
      if (isStatusCodeValid(data.status)) {
        toast.success('Successfully!');
      } else {
        toast.error('Failed!');
      }
    },
  });

  return useMutationHook;
};
export default useGetInviteProject;
