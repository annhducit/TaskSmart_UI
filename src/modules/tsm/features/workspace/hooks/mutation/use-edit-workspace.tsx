import { tsmAxios } from '@/configs/axios';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { toast } from 'sonner';

const editWorkspace = async (workspace: Partial<Workspace>) => {
  const data = await tsmAxios.put<AxiosResponse<Workspace>>(
    `/workspaces/${workspace.id}`,
    workspace
  );
  return data;
};

const useEditWorkspace = () => {
  return useMutation({
    mutationFn: (workspace: Partial<Workspace>) => editWorkspace(workspace),
    onSuccess(data) {
      if (isStatusCodeValid(data.status)) {
        toast.success('Workspace updated successfully');
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useEditWorkspace;
