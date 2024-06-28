import { tsmAxios } from '@/configs/axios';
import { queryClient } from '@/configs/query-client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const getTemplate = async (templateId: string) => {
  const { data } = await tsmAxios.get<TSMTemplateDetail>(`/templates/${templateId}`);
  return data;
};

const useGetTemplate = () => {
  const { templateId } = useParams<{ templateId: string }>();

  const { queryKey } = useTemplateQueryKey(templateId as string);
  return useQuery({
    queryKey,
    queryFn: () => getTemplate(templateId as string),
  });
};

export default useGetTemplate;

function useTemplateQueryKey(templateId: string) {
  const queryKey = ['tsm/template/detail', templateId];
  return {
    queryKey,
  };
}

export const useInvalidateTemplate = (templateId: string) => {
  const { queryKey } = useTemplateQueryKey(templateId);
  return () =>
    queryClient.invalidateQueries({
      type: 'all',
      queryKey,
    });
};
