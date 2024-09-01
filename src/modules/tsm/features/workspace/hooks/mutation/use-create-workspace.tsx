import { tsmAxios } from '@/configs/axios';
import { useInvalidateProfile } from '@/modules/tsm/components/hooks/use-profile';
import { useDialogContext } from '@/shared/components/dialog/provider';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { useInvalidateWorkspaces } from '../query/use-get-workspaces';

const createWorkspace = async (value: Partial<Workspace>) => {
  const data = await tsmAxios.post<AxiosResponse<Workspace>>('/workspaces', value);
  return data;
};

const useCreateWorkspace = () => {
  const { onClose } = useDialogContext();

  const invalidateWorkspace = useInvalidateProfile();
  const invalidateWorkspaceAll = useInvalidateWorkspaces();
  return useMutation({
    mutationFn: (value: Partial<Workspace>) => createWorkspace(value),
    onSuccess(data) {
      if (isStatusCodeValid(data.status)) {
        invalidateWorkspace();
        invalidateWorkspaceAll();
        onClose();
        toast.success('Workspace created successfully');
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useCreateWorkspace;
