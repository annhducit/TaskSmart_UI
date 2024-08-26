import { tsmAxios } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

export const getPdfFile = async (projectId: string) => {
  const { data } = await tsmAxios.get(`/projects/${projectId}/document`, {
    responseType: 'blob',
  });

  return data;
};

const useGetPdf = (projectId: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['tsm/project/pdf', projectId],
    queryFn: () => getPdfFile(projectId),
    enabled: !!projectId,
  });

  return { data, isLoading, refetch };
};

export default useGetPdf;
