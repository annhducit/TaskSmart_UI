import { tsmAxios } from '@/configs/axios';
import { SEARCH_PARAMS } from '@/shared/constant/search-param';
import useSearchParams from '@/shared/hooks/use-search-params';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateCard } from '../query/use-get-card';

const createCheckListGroup = async (cardId: string, name: string) => {
  const { data } = await tsmAxios.post(`/cards/${cardId}/checklists`, {
    name,
  });
  return data;
};

const useCreateCheckListGroup = () => {
  const cardId = useSearchParams().get(SEARCH_PARAMS.ID);

  const invalidateCard = useInvalidateCard(cardId as string);

  return useMutation({
    mutationFn: (name: string) => createCheckListGroup(cardId as string, name),
    onSuccess() {
      invalidateCard();
      toast.success('Checklist group created successfully');
    },
  });
};

export default useCreateCheckListGroup;
