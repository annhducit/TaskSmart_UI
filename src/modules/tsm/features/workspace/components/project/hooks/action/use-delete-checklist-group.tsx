import { tsmAxios } from '@/configs/axios';
import { SEARCH_PARAMS } from '@/shared/constant/search-param';
import useSearchParams from '@/shared/hooks/use-search-params';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateCard } from '../query/use-get-card';

const deleteCheckListGroup = async (cardId: string, listId: string) => {
  const { data } = await tsmAxios.delete(`/cards/${cardId}/checklists/${listId}`);
  return data;
};

const useDeleteCheckListGroup = () => {
  const cardId = useSearchParams().get(SEARCH_PARAMS.ID);

  const invalidateCard = useInvalidateCard(cardId as string);

  return useMutation({
    mutationFn: (listId: string) => deleteCheckListGroup(cardId as string, listId),
    onSuccess() {
      invalidateCard();
      toast.success('Checklist group deleted successfully');
    },
  });
};

export default useDeleteCheckListGroup;
