import { tsmAxios } from '@/configs/axios';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateProject } from '../query/use-get-project';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';

const updateListCard = async (projectId: string, listCard: Partial<ListCard>) => {
  const data = await tsmAxios.put(`/projects/${projectId}/${listCard.id}`, listCard);
  return data;
};

const useUpdateListCard = () => {
  const projectId = getIdProjectFromUrl();
  const invalideProject = useInvalidateProject(projectId);
  return useMutation({
    mutationFn: (listCard: Partial<ListCard>) => updateListCard(projectId, listCard),
    onSuccess(data) {
      if (isStatusCodeValid(data.status)) {
        toast.success('List card update successfully');
        invalideProject();
      } else {
        toast.error('Failed to update list card');
      }
    },
  });
};
export default useUpdateListCard;
