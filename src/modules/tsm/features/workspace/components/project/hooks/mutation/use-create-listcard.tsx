import { tsmAxios } from '@/configs/axios';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateProject } from '../query/use-get-project';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';

const createListCard = async (projectId: string, listCard: Partial<ListCard>) => {
  const payload = {
    name: listCard.name,
  };
  const data = await tsmAxios.post(`/projects/${projectId}`, payload);
  return data;
};

const useCreateListCard = () => {
  const projectId = getIdProjectFromUrl();
  const invalideProject = useInvalidateProject(projectId);
  return useMutation({
    mutationFn: (listCard: Partial<ListCard>) => createListCard(projectId, listCard),
    onSuccess(data) {
      if (isStatusCodeValid(data.status)) {
        toast.success('List card created successfully');
        invalideProject();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export default useCreateListCard;
