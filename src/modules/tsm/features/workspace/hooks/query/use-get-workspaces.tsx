import { tsmAxios } from '@/configs/axios';
import { queryClient } from '@/configs/query-client';
import { useQuery } from '@tanstack/react-query';

const getAllWorkspace = async () => {
  const { data } = await tsmAxios.get<Workspace[]>('/workspaces');
  return data;
};

const useGetWorkspaces = () => {
  const { queryKey } = useWorkspaceQueryKey();
  return useQuery({
    queryKey: queryKey,
    queryFn: getAllWorkspace,
  });
};

function useWorkspaceQueryKey() {
  const queryKey = ['tsm/workspaces'];
  return {
    queryKey,
  };
}

export const useInvalidateWorkspaces = () => {
  const { queryKey } = useWorkspaceQueryKey();
  return () =>
    queryClient.invalidateQueries({
      type: 'all',
      queryKey,
    });
};

export default useGetWorkspaces;
