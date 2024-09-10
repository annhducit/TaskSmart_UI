import { tsmAxios } from '@/configs/axios';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const applyTemplate = async (
  templateId: string,
  payload: {
    workspaceId: string;
    projectName: string;
  }
) => {
  const query = new URLSearchParams();

  query.append('workspaceId', payload.workspaceId);
  query.append('projectName', payload.projectName);

  const data = await tsmAxios.post(`/templates/${templateId}/apply?${query.toString()}`);

  return data;
};

const useApplyTemplate = () => {
  const navigate = useNavigate();
  return useMutation<
    AxiosResponse,
    Error,
    { templateId: string; payload: { workspaceId: string; projectName: string } }
  >({
    mutationFn: ({ templateId, payload }) => applyTemplate(templateId, payload),
    onSuccess(data) {
      if (isStatusCodeValid(data.status)) {
        toast.success('Template applied successfully');
        navigate(`../../../tsm/project/${data?.data?.projectId}?view=project`);
      } else {
        toast.error('Failed to apply template');
      }
    },
  });
};

export default useApplyTemplate;
