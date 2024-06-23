import { tsmAxios } from '@/configs/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateCard } from '../query/use-get-card';
import { SEARCH_PARAMS } from '@/shared/constant/search-param';
import useSearchParams from '@/shared/hooks/use-search-params';

const deleteItemChecked = async (cardId: string, listId: string, itemId: string) => {
  const { data } = await tsmAxios.delete(`/cards/${cardId}/checklists/${listId}/${itemId}`);
  return data;
};

const useDeleteItemChecked = () => {
  const cardId = useSearchParams().get(SEARCH_PARAMS.ID);

  const invalidateCard = useInvalidateCard(cardId as string);

  return useMutation({
    mutationFn: ({ listId, itemId }: { listId: string; itemId: string }) =>
      deleteItemChecked(cardId as string, listId, itemId),
    onSuccess() {
      invalidateCard();
      toast.success('Checklist item deleted successfully');
    },
  });
};

export default useDeleteItemChecked;
