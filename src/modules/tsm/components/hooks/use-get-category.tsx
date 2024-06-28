import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const getCategory = async (id: string) => {
  const { data } = await tsmAxios.get<Category>(`/categories/${id}`);
  return data;
};

const useGetCategory = (id: string) => {
  return useQuery({
    queryKey: ['tsm/category', id],
    queryFn: () => getCategory(id),
  });
};

export default useGetCategory;
