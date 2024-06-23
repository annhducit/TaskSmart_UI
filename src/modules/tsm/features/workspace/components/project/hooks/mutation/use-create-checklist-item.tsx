import { tsmAxios } from '@/configs/axios';
import { SEARCH_PARAMS } from '@/shared/constant/search-param';
import useSearchParams from '@/shared/hooks/use-search-params';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateCard } from '../query/use-get-card';

const createChecklistItem = async (cardId: string, listId: string, name: string) => {
  const { data } = await tsmAxios.post(`/cards/${cardId}/checklists/${listId}`, {
    name,
  });
  return data;
};

const useCreateChecklistItem = () => {
  const cardId = useSearchParams().get(SEARCH_PARAMS.ID);

  const invalidateCard = useInvalidateCard(cardId as string);

  return useMutation({
    mutationFn: ({ listId, name }: { listId: string; name: string }) =>
      createChecklistItem(cardId as string, listId, name),
    onSuccess() {
      invalidateCard();
      toast.success('Checklist group deleted successfully');
    },
  });
};

export default useCreateChecklistItem;
