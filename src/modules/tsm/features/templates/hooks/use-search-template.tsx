import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const searchTemplate = async (keyword: string) => {
  const query = keyword ? `?keyword=${keyword}` : '';
  const response = await tsmAxios.get(`/templates/search${query}`);
  return response.data;
};

const useSearchTemplate = (keyword: string) => {
  return useQuery({
    queryKey: ['search-template', keyword],
    queryFn: () => searchTemplate(keyword),
    enabled: !!keyword,
  });
};

export default useSearchTemplate;
