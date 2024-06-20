import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const getWorkspace = async (workspaceId: string) => {
  const { data } = await tsmAxios.get<Workspace>(`/workspaces/${workspaceId}`);
  return data;
};

const useGetWorkspace = () => {
  const { workspaceId } = useParams();
  return useQuery({
    queryKey: ['tsm/workspace/detail', workspaceId],
    queryFn: () => getWorkspace(workspaceId as string),
  });
};

export default useGetWorkspace;
