import { tsmAxios } from '@/configs/axios';
import { queryClient } from '@/configs/query-client';
import { useQuery } from '@tanstack/react-query';

const getCategories = async () => {
  const { data } = await tsmAxios.get<Category[]>(`/categories`);
  return data;
};

const useGetCategories = () => {
  const { queryKey } = useCategoryQueryKey();
  return useQuery({
    queryKey,
    queryFn: getCategories,
  });
};

export default useGetCategories;

function useCategoryQueryKey() {
  const queryKey = ['tsm/category'];
  return {
    queryKey,
  };
}

export const useInvalidateCategory = () => {
  const { queryKey } = useCategoryQueryKey();
  return () =>
    queryClient.invalidateQueries({
      type: 'all',
      queryKey,
    });
};
