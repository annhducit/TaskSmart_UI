import { tsmAxios } from '@/configs/axios';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const useGetInviteWorkspace = (payload: { isPublic: boolean; refresh: boolean }) => {
  const { isPublic, refresh } = payload;

  const { workspaceId } = useParams<{ workspaceId: string }>();

  const useMutationHook = useMutation({
    mutationFn: async () => {
      const query = `?isPublic=${isPublic}&refresh=${refresh}`;

      const data = await tsmAxios.patch(`/workspaces/invite/${workspaceId}${query}`);
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
export default useGetInviteWorkspace;
