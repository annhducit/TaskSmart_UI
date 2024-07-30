import { tsmAxios } from '@/configs/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const saveDbStructure = async (payload: { projectId: string; statement: string }) => {
  const { projectId, statement } = payload;
  const { data } = await tsmAxios.post(`/projects/${projectId}/save-db-structure`, {
    statement,
  });
  return data;
};

const useSaveDbStructure = () => {
  return useMutation({
    mutationFn: saveDbStructure,
    onSuccess: () => {
      toast.success('Save db structure success');
    },
  });
};

export default useSaveDbStructure;
