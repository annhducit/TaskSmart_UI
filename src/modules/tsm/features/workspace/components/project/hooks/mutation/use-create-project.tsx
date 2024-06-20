import { tsmAxios } from '@/configs/axios';
import { queryClient } from '@/configs/query-client';
import { useDialogContext } from '@/shared/components/dialog/provider';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';

const createProject = async (value: TSMProjectRequest) => {
  const data = await tsmAxios.post<AxiosResponse<Project>>('/projects', value);
  return data;
};

const useCreateProject = () => {
  const { onClose } = useDialogContext();
  return useMutation({
    mutationFn: (value: TSMProjectRequest) => createProject(value),
    onSuccess(data) {
      if (isStatusCodeValid(data.status)) {
        queryClient.invalidateQueries({
          queryKey: ['tsm/workspace/detail'],
        });
        onClose();
        toast.success('Project created successfully');
      } else {
        toast.error('Failed to create project');
      }
    },
  });
};

export default useCreateProject;
