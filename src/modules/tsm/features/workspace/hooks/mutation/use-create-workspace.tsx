import { tsmAxios } from '@/configs/axios';
import { useInvalidateProfile } from '@/modules/tsm/components/hooks/use-profile';
import { useDialogContext } from '@/shared/components/dialog/provider';
import { isStatusCodeValid } from '@/shared/components/status';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { toast } from 'sonner';

const createWorkspace = async (value: Partial<Workspace>) => {
  const data = await tsmAxios.post<AxiosResponse<Workspace>>('/workspaces', value);
  return data;
};

const useCreateWorkspace = () => {
  const { onClose } = useDialogContext();

  const invalidateWorkspace = useInvalidateProfile();
  return useMutation({
    mutationFn: (value: Partial<Workspace>) => createWorkspace(value),
    onSuccess(data) {
      if (isStatusCodeValid(data.status)) {
        invalidateWorkspace();
        onClose();
        toast.success('Workspace created successfully');
      } else {
        toast.error('Failed to create workspace');
      }
    },
  });
};

export default useCreateWorkspace;
