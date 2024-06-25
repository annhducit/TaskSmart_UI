import { tsmAxios } from '@/configs/axios';
import { queryClient } from '@/configs/query-client';
import { useQuery } from '@tanstack/react-query';

const getTemplates = async () => {
  const { data } = await tsmAxios.get<TSMTemplate[]>(`/templates`);
  return data;
};

const useGetTemplates = () => {
  const { queryKey } = useTemplatesQueryKey();
  return useQuery({
    queryKey,
    queryFn: getTemplates,
  });
};

export default useGetTemplates;

function useTemplatesQueryKey() {
  const queryKey = ['tsm/templates'];
  return {
    queryKey,
  };
}

export const useInvalidateTemplates = () => {
  const { queryKey } = useTemplatesQueryKey();
  return () =>
    queryClient.invalidateQueries({
      type: 'all',
      queryKey,
    });
};
