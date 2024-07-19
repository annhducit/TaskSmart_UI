import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const searchProject = async (search: string, workSpaceId: string) => {
  const query = search ? `?query=${search}` : '';
  const data = await tsmAxios.get<Project[]>(`/projects/search${query}&workSpaceId=${workSpaceId}`);
  return data.data;
};

const useSearchProject = (keyword: string) => {
  const { workspaceId } = useParams();
  return useQuery({
    queryKey: ['tsm/project/search', keyword],
    queryFn: () => searchProject(keyword, workspaceId as string),
    enabled: !!keyword,
  });
};

export default useSearchProject;
