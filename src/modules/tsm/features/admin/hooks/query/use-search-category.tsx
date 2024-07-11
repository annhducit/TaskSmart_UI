import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const searchCategory = async (query: string) => {
  const { data } = await tsmAxios.get(`/categories/search?keyword=${query}`);
  return data;
};

const useSearchCategory = (search: string) => {
  return useQuery({
    queryKey: ['tsm/search/category', search],
    queryFn: () => searchCategory(search),
    enabled: !!search,
  });
};
export default useSearchCategory;
