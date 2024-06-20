import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

const getAllWorkspace = async () => {
  const { data } = await tsmAxios.get<AxiosResponse<Workspace[]>>('/workspaces');
  return data.data;
};

const useGetWorkspaces = () => {
  return useQuery({
    queryKey: ['tsm/workspaces'],
    queryFn: getAllWorkspace,
  });
};

export default useGetWorkspaces;
