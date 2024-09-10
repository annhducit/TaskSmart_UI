import { tsmAxios } from '@/configs/axios';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateProject } from '../query/use-get-project';
import { isStatusCodeValid } from '@/shared/components/status';

const deleteListCard = async (projectId: string, listCardId: string) => {
  const data = await tsmAxios.delete(`/projects/${projectId}/${listCardId}`);
  return data;
};

const useDeleteListCard = () => {
  const projectId = getIdProjectFromUrl();

  const invalidateProject = useInvalidateProject(projectId);
  return useMutation({
    mutationFn: (listCardId: string) => deleteListCard(projectId, listCardId),
    onSuccess(data) {
      if (isStatusCodeValid(data.status)) {
        invalidateProject();
        toast.success('List card deleted successfully');
      } else {
        toast.error('Failed to delete list card');
      }
    },
    onError(data) {
      toast.error(data.message);
    },
  });
};

export default useDeleteListCard;
