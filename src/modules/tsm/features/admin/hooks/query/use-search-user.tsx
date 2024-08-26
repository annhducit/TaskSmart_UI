import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const searchUser = async (search: string) => {
  const { data } = await tsmAxios.get(`/users/search?keyword=${search}`);
  return data;
};

const useSearchUser = (keyword: string) => {
  return useQuery({
    queryKey: ['tsm/search/user', keyword],
    queryFn: () => searchUser(keyword),
    enabled: !!keyword,
  });
};

export default useSearchUser;
