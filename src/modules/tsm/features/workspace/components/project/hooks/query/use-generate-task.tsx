import { tsmAxios } from '@/configs/axios';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { useQuery } from '@tanstack/react-query';

const generateTask = async (projectId: string) => {
  const { data } = await tsmAxios.get<ListCard[]>(`/projects/${projectId}/generate-task`);
  return data;
};

const useGenerateTask = () => {
  const projectId = getIdProjectFromUrl();
  return useQuery({
    queryKey: ['tsm/project/generate-task', projectId],
    queryFn: () => generateTask(projectId),
  });
};

export default useGenerateTask;
