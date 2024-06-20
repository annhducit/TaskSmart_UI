import { tsmAxios } from '@/configs/axios';
import useLocalStorage from '@/shared/hooks/use-local-storage';
import { useQuery } from '@tanstack/react-query';

const getProject = async (projectId: string) => {
  const { data } = await tsmAxios.get<Project>(`/projects/${projectId}`);
  return data;
};

const useGetProject = () => {
  const [projectId] = useLocalStorage('project_id', '');

  return useQuery({
    queryKey: ['tsm/project/detail', projectId],
    queryFn: () => getProject(projectId as string),
  });
};

export default useGetProject;
