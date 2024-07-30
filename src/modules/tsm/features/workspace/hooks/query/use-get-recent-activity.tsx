import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const getRecentActivity = async () => {
  const { data } = await tsmAxios.get<Project[]>(`/projects/recent`);
  return data;
};

const useGetRecentActivity = () => {
  return useQuery({
    queryKey: ['tsm/recent-activity'],
    queryFn: getRecentActivity,
  });
};

export default useGetRecentActivity;
