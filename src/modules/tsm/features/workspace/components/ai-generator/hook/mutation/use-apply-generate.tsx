import { tsmAxios } from '@/configs/axios';
import { getIdProjectFromUrl } from '@/shared/components/getIdByUrl';
import { useMutation } from '@tanstack/react-query';
import { isStatusCodeValid } from '@/shared/components/status';
import { toast } from 'sonner';

import { AxiosResponse } from 'axios';
import { useInvalidateProject } from '../../../project/hooks/query/use-get-project';
import { useNavigate } from 'react-router-dom';

const applyGenerate = async (projectId: string, taskGenerate: TasksGenerate) => {
  const data = await tsmAxios.post(`/projects/${projectId}/apply-generate`, taskGenerate);
  return data;
};

const useApplyGenerate = () => {
  const projectId = getIdProjectFromUrl();

  const navigate = useNavigate();

  const invalidateProject = useInvalidateProject(projectId);

  return useMutation<AxiosResponse<any>, Error, { taskGenerate: TasksGenerate }>({
    mutationFn: ({ taskGenerate }) => applyGenerate(projectId, taskGenerate),
    onSuccess(data) {
      if (isStatusCodeValid(data.status)) {
        toast.success('Apply generate successfully');

        invalidateProject();

        navigate(`tsm/project/${projectId}?view=project`, {
          replace: true,
        });
      } else {
        toast.error('Failed to create card');
      }
    },
  });
};

export default useApplyGenerate;