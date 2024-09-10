import { tsmAxios } from '@/configs/axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const removeWorkspace = async (workspaceId: string) => {
  await tsmAxios.delete(`/workspaces/${workspaceId}`);
};

const useRemoveWorkspace = () => {
  return useMutation({
    mutationFn: (workspaceId: string) => removeWorkspace(workspaceId),
    onSuccess() {
      toast.success('Workspace removed successfully');
    },
  });
};

export default useRemoveWorkspace;
