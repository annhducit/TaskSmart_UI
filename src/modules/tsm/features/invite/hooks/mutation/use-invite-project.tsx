import { tsmAxios } from '@/configs/axios';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateProject } from '../../../workspace/components/project/hooks/query/use-get-project';

const useGetInviteProject = (payload: { isPublic: boolean; refresh: boolean }) => {
  const { isPublic, refresh } = payload;

  const projectId = getIdProjectFromUrl();

  const invalidateProject = useInvalidateProject(projectId);

  const useMutationHook = useMutation({
    mutationFn: async () => {
      const query = `?isPublic=${isPublic}&refresh=${refresh}`;

      const data = await tsmAxios.patch(`/projects/invite/${projectId}${query}`);
      return data;
    },
    onSuccess(data, _variables, _context) {
      if (isStatusCodeValid(data.status)) {
        toast.success('Successfully!');
        invalidateProject();
      } else {
        toast.error('Failed!');
      }
    },
  });

  return useMutationHook;
};
export default useGetInviteProject;
