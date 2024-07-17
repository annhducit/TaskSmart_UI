import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const searchAll = async (query: string) => {
  const data = await tsmAxios.get<TSMSearchEverything>(`/search?query=${query}`);
  return data.data;
};

const useSearchAll = (keyword: string) => {
  return useQuery({
    queryKey: ['tsm/search-all', keyword],
    queryFn: () => searchAll(keyword),
    enabled: !!keyword,
  });
};

export default useSearchAll;
