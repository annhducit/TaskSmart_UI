import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const getAllWorkspace = async () => {
  const { data } = await tsmAxios.get<Workspace[]>('/workspaces');
  return data;
};

const useGetWorkspaces = () => {
  return useQuery({
    queryKey: ['tsm/workspaces'],
    queryFn: getAllWorkspace,
  });
};

export default useGetWorkspaces;
