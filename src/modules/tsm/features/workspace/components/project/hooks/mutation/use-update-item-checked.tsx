import { tsmAxios } from '@/configs/axios';
import { useMutation } from '@tanstack/react-query';
import { useInvalidateCard } from '../query/use-get-card';
import { SEARCH_PARAMS } from '@/shared/constant/search-param';
import useSearchParams from '@/shared/hooks/use-search-params';
import { toast } from 'sonner';

const updateItemChecked = async (
  cardId: string,
  listId: string,
  itemId: string,
  checked: boolean
) => {
  const { data } = await tsmAxios.patch(`/cards/${cardId}/checklists/${listId}/${itemId}`, {
    checked,
  });

  return data;
};

const useUpdateItemChecked = () => {
  const cardId = useSearchParams().get(SEARCH_PARAMS.ID);
  const invalidateCard = useInvalidateCard(cardId as string);

  return useMutation({
    mutationFn: ({
      listId,
      itemId,
      checked,
    }: {
      listId: string;
      itemId: string;
      checked: boolean;
    }) => updateItemChecked(cardId as string, listId, itemId, checked),
    onSuccess() {
      invalidateCard();
      toast.success('Checklist item updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useUpdateItemChecked;
