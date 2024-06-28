import { tsmAxios } from '@/configs/axios';
import { queryClient } from '@/configs/query-client';
import { useQuery } from '@tanstack/react-query';

const getTemplates = async (payload?: { categoryId?: string; category?: string }) => {
  const queryParams = new URLSearchParams();

  if (payload?.categoryId) {
    queryParams.append('categoryId', payload.categoryId);
  }
  if (payload?.category) {
    queryParams.append('category', payload.category);
  }
  const query = queryParams.toString() ? `?${queryParams.toString()}` : '';

  const { data } = await tsmAxios.get<TSMTemplate[]>(`/templates${query}`);

  return data;
};

const useGetTemplates = (payload?: { categoryId?: string; category?: string }) => {
  const { queryKey } = useTemplatesQueryKey();
  return useQuery({
    queryKey,
    queryFn: () => getTemplates(payload),
  });
};

export default useGetTemplates;

function useTemplatesQueryKey() {
  const queryKey = ['tsm/templates'];
  return {
    queryKey,
  };
}

export const useInvalidateTemplates = () => {
  const { queryKey } = useTemplatesQueryKey();
  return () =>
    queryClient.invalidateQueries({
      type: 'all',
      queryKey,
    });
};
