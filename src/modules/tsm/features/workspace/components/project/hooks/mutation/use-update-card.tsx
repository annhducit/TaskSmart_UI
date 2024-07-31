import { tsmAxios } from '@/configs/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useInvalidateProject } from '../query/use-get-project';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { useInvalidateCard } from '../query/use-get-card';
import useSearchParams from '@/shared/hooks/use-search-params';
import { SEARCH_PARAMS } from '@/shared/constant/search-param';

const updateCard = async (card: Partial<Card>) => {
  const data = await tsmAxios.patch(`/cards/${card.id}`, card);
  return data;
};

const useUpdateCard = () => {
  const projectId = getIdProjectFromUrl();

  const cardId = useSearchParams().get(SEARCH_PARAMS.ID);

  const invalidateProject = useInvalidateProject(projectId);
  const invalidateCard = useInvalidateCard(cardId as string);
  return useMutation({
    mutationFn: (card: Partial<Card>) => updateCard(card),
    onSuccess() {
      invalidateCard();
      invalidateProject();

      toast.success('Card updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useUpdateCard;
