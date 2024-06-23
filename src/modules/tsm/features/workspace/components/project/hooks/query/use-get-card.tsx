import { tsmAxios } from '@/configs/axios';
import { queryClient } from '@/configs/query-client';
import { SEARCH_PARAMS } from '@/shared/constant/search-param';
import useSearchParams from '@/shared/hooks/use-search-params';
import { useQuery } from '@tanstack/react-query';

const getCard = async (cardId: string) => {
  const { data } = await tsmAxios.get<Card>(`/cards/${cardId}`);
  return data;
};

const useGetCard = () => {
  const searhParams = useSearchParams();
  const cardId = searhParams.get(SEARCH_PARAMS.ID);

  const { queryKey } = useCardQueryKey(cardId as string);

  return useQuery({
    queryKey,
    queryFn: () => getCard(cardId as string),
  });
};

export default useGetCard;

function useCardQueryKey(cardId: string) {
  const queryKey = ['tsm/card/detail', cardId];
  return {
    queryKey,
  };
}

export const useInvalidateCard = (cardId: string) => {
  const { queryKey } = useCardQueryKey(cardId);
  return () =>
    queryClient.invalidateQueries({
      type: 'all',
      queryKey,
    });
};
