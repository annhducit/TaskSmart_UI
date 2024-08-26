import { tsmAxios } from '@/configs/axios';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { useInvalidateProject } from '../query/use-get-project';
import { useMutation } from '@tanstack/react-query';
import { isStatusCodeValid } from '@/shared/components/status';
import { toast } from 'sonner';

import { AxiosResponse } from 'axios';

const createCard = async (projectId: string, columnId: string, card: Partial<Card>) => {
  const data = await tsmAxios.post(`/projects/${projectId}/${columnId}`, card);
  return data;
};

const useCreateCard = () => {
  const projectId = getIdProjectFromUrl();
  const invalidateProject = useInvalidateProject(projectId);

  return useMutation<AxiosResponse<any>, Error, { columnId: string; card: Partial<Card> }>({
    mutationFn: ({ columnId, card }) => createCard(projectId, columnId, card),
    onSuccess(data) {
      if (isStatusCodeValid(data.status)) {
        toast.success('Card created successfully');
        invalidateProject();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useCreateCard;
