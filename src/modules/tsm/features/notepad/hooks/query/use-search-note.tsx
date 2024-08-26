import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const searchNote = async (search: string) => {
  const query = search ? `?query=${search}` : '';
  const { data } = await tsmAxios.get<BaseResponseType<TSMNote[]>>(`/note/search${query}`);
  return data.data;
};

const useSearchNote = (search: string) => {
  return useQuery({
    queryKey: ['search-note', search],
    queryFn: () => searchNote(search),
    enabled: !!search,
  });
};

export default useSearchNote;
