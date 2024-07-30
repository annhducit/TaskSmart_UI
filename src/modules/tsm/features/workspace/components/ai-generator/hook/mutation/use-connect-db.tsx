import { tsmAxios } from '@/configs/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const connectDb = async (payload: { projectId: string; uri: string }) => {
  const { projectId, uri } = payload;
  const { data } = await tsmAxios.post<{ schema: string }>(
    `/projects/${projectId}/get-structure-by-uri`,
    { uri }
  );
  return data;
};

const useConnectDb = () => {
  return useMutation({
    mutationFn: connectDb,
    onSuccess: () => {
      toast.success('Connect db success');
    },
  });
};

export default useConnectDb;
