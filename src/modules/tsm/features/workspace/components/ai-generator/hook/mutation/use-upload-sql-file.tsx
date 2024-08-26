import { tsmAxios } from '@/configs/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const uploadSqlFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await tsmAxios.post<{ result: string }>(`/pyhelper/file-handler`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

const useUploadSqlFile = () => {
  return useMutation({
    mutationFn: uploadSqlFile,
    onSuccess: () => {
      toast.success('Upload file success');
    },
  });
};

export default useUploadSqlFile;
