import { tsmAxios } from '@/configs/axios';
import { SEARCH_PARAMS } from '@/shared/constant/search-param';
import useSearchParams from '@/shared/hooks/use-search-params';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateCard } from '../query/use-get-card';

const createCardComment = async (cardId: string, content: string) => {
  const { data } = await tsmAxios.post(`/cards/${cardId}/comment`, { content });
  return data;
};

const useCreateCardComment = () => {
  const cardId = useSearchParams().get(SEARCH_PARAMS.ID);

  const invalidateCard = useInvalidateCard(cardId as string);

  return useMutation({
    mutationFn: (content: string) => createCardComment(cardId as string, content),
    onSuccess() {
      invalidateCard();
      toast.success('Comment created successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useCreateCardComment;
