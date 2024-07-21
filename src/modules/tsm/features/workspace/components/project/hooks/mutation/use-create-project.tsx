import { tsmAxios } from '@/configs/axios';
import { queryClient } from '@/configs/query-client';
import { useDialogContext } from '@/shared/components/dialog/provider';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const createProject = async (value: TSMProjectRequest) => {
  const data = await tsmAxios.post<Project>('/projects', value);
  return data;
};

const useCreateProject = () => {
  const { onClose } = useDialogContext();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (value: TSMProjectRequest) => createProject(value),
    onSuccess(data) {
      if (!isStatusCodeValid(data.status)) {
        toast.error('Failed to create project');
      } else {
        queryClient.invalidateQueries({
          queryKey: ['tsm/workspace/detail'],
        });
        onClose();
        toast.success('Project created successfully');
        navigate(`tsm/project/${data?.data?.id}?view=project`, {
          replace: true,
        });
      }
    },
  });
};

export default useCreateProject;
