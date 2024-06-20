import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const getCategories = async () => {
  const { data } = await tsmAxios.get<Category[]>('/categories');
  return data;
};

const useGetCategories = () => {
  return useQuery({
    queryKey: ['tsm/categories'],
    queryFn: getCategories,
  });
};

export default useGetCategories;
