import { tsmAxios } from '@/configs/axios';
import { SEARCH_PARAMS } from '@/shared/constant/search-param';
import useSearchParams from '@/shared/hooks/use-search-params';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateProject } from '../query/use-get-project';
import { useInvalidateCard } from '../query/use-get-card';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';

const updateCardImplementer = async (cardId: string, implementers: UserRelation[]) => {
  const userIds = implementers?.map((user) => user.userId);
  const { data } = await tsmAxios.post(`/cards/${cardId}/implementers`, { userIds });

  return data;
};

const useUpdateCardImplementer = () => {
  const cardId = useSearchParams().get(SEARCH_PARAMS.ID);
  const projectId = getIdProjectFromUrl();

  const invalidateProject = useInvalidateProject(projectId);
  const invalidateCard = useInvalidateCard(cardId as string);

  return useMutation({
    mutationFn: (implementers: UserRelation[]) =>
      updateCardImplementer(cardId as string, implementers),
    onSuccess() {
      toast.success('Card implementer updated successfully');
      invalidateCard();
      invalidateProject();
    },
  });
};

export default useUpdateCardImplementer;
