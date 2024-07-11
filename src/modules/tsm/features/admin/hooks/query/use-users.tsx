import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const getUsers = async () => {
  const { data } = await tsmAxios.get('/users');
  return data;
};

const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};

export default useGetUsers;
