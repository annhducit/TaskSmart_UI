import { tsmAxios } from '@/configs/axios';
import { queryClient } from '@/configs/query-client';
import { useDialogContext } from '@/shared/components/dialog/provider';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useInvalidateWorkspaces } from '../../../../hooks/query/use-get-workspaces';
import { useInvalidateProfile } from '@/modules/tsm/components/hooks/use-profile';

const createProject = async (value: TSMProjectRequest) => {
  const data = await tsmAxios.post<Project>('/projects', value);
  return data;
};

const useCreateProject = () => {
  const { onClose } = useDialogContext();

  const invalidateWorkspace = useInvalidateWorkspaces();
  const invalidateProfile = useInvalidateProfile();

  const navigate = useNavigate();
  return useMutation({
    mutationFn: (value: TSMProjectRequest) => createProject(value),
    onSuccess(data) {
      if (isStatusCodeValid(data.status)) {
        queryClient.invalidateQueries({
          queryKey: ['tsm/workspace/detail'],
        });
        invalidateWorkspace();
        invalidateProfile();
        onClose();
        data.data.id &&
          navigate(`tsm/project/${data?.data?.id}?view=project`, {
            replace: true,
          });
        toast.success('Project created successfully');
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useCreateProject;
