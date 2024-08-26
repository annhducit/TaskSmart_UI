import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const searchTemplate = async (query: string) => {
  const { data } = await tsmAxios.get<TSMTemplate[]>(`/templates/search-only?query=${query}`);
  return data;
};

const useSearchTemplate = (search: string) => {
  return useQuery({
    queryKey: ['tsm/search/template', search],
    queryFn: () => searchTemplate(search),
    enabled: !!search,
  });
};
export default useSearchTemplate;
