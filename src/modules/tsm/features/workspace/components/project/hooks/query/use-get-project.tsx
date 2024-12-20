import { tsmAxios } from '@/configs/axios';
import { queryClient } from '@/configs/query-client';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import useGetPath from '@/shared/hooks/use-get-path';
import { useQuery } from '@tanstack/react-query';

const getProject = async (projectId: string) => {
  const { data } = await tsmAxios.get<Project>(`/projects/${projectId}`);
  return data;
};

const useGetProject = () => {
  const projectId = getIdProjectFromUrl();
  const { path } = useGetPath();

  const isProject = path.includes('project');
  const { queryKey } = useProjectQueryKey(projectId);

  const { data, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () => getProject(projectId),
    enabled: isProject,
  });
  return { data, isLoading, refetch };
};

export default useGetProject;

function useProjectQueryKey(projectId: string) {
  const queryKey = ['tsm/project/detail', projectId];
  return {
    queryKey,
  };
}

export const useInvalidateProject = (projectId: string) => {
  const { queryKey } = useProjectQueryKey(projectId);
  return () =>
    queryClient.invalidateQueries({
      type: 'all',
      queryKey,
    });
};
